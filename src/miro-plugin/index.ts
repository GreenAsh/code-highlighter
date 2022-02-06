import IWidget = SDK.IWidget;
import * as Sentry from '@sentry/browser';
import {default as highlighter} from '../code-highlighter/prism';
import {settings} from '../settings/shared-settings'
import {ThemeContext} from '../code-highlighter/prism/themes/interfaces';
import {themeRegistry} from '../code-highlighter/prism/themes';
import {DEFAULT_THEME} from '../code-highlighter/config';
import {langKey2Description, LanguageDescription, settings} from '../settings/shared-settings'
import {ThemeContext} from '../code-highlighter/prism/themes/interfaces';
import {themeRegistry} from '../code-highlighter/prism/themes';
import {DEFAULT_THEME} from '../code-highlighter/config';
import {langKey2IconData, mainIcon} from './icons';
import IContextMenuItem = SDK.IContextMenuItem;

function getWidgetText(widget: any): string {
    if (widget.text){
        return widget.text;
    } else {
        return '';
    }
}

const MAX_TEXT_SIZE = 6000;

miro.onReady(async () => {
    const authorized = await miro.isAuthorized();
    if (!authorized) {
        return;
    }

    const canEditWidgets = await hasPermission('EDIT_CONTENT');
    if (!canEditWidgets) {
        return;
    }
    // set up default theme
    if (!settings.hasTheme()) {
        settings.setTheme(DEFAULT_THEME)
    }

    await miro.initialize({
        extensionPoints: {
            bottomBar: async () => {
                return {
                    title: 'Code Syntax Highlighter',
                    svgIcon: mainIcon,
                    onClick: bottomBarAction
                };
            },
            getWidgetMenuItems: async (widgets) => {
                if (!hasAllowedWidgets(widgets)) {
                    return [];
                }
                return settings.getMenuButtons()
                    .filter(key => langKey2IconData.has(key))
                    .map(key => {
                        const langDescription: LanguageDescription = langKey2Description.get(key)
                        const iconData: string = langKey2IconData.get(key)
                        const menuItem: IContextMenuItem = {
                            onClick: async () => {
                                await contextMenuHighlight(langDescription.key)
                            },
                            svgIcon: iconData,
                            tooltip: langDescription.displayName
                        }
                        return menuItem
                    })
            }
        }
    })
});

const SUPPORTED_WIDGET_TYPES = new Set<string>(['SHAPE', 'TEXT']);

function hasAllowedWidgets(widgets: IWidget[]): boolean {
    for (let i = 0; i < widgets.length; i++) {
        const widget = widgets[i];
        if (SUPPORTED_WIDGET_TYPES.has(widget.type)) {
            return true;
        }
    }
    return false;
}

async function hasPermission(permission: String) {
    let permissions = await miro.currentUser.getCurrentBoardPermissions();
    for (let i = 0; i < permissions.length; i++) {
        if (permissions[i] === permission) {
            return true;
        }
    }
    return false;
}

async function bottomBarAction(){
    await showSettings();
}

async function reselectWidgets(widgets: IWidget[]) {
    let reselection:string[] = [];
    for (let i = 0; i < widgets.length; i++) {
        let widget = widgets[i];
        reselection.push(widget.id);
    }
    if (reselection.length != 0) {
        // await miro.board.selection.clear();
        await miro.board.selection.selectWidgets(reselection)
    }
}

async function contextMenuHighlight(lang: string) {
    const widgets = await miro.board.selection.get();
    await reselectWidgets(widgets);
    await highlightWidgets(lang, widgets);
}

async function showSettings(){
    await miro.board.ui.openModal('settings.html', {
        width: 600,
        height: 280
    });
}

async function highlightWidgets(lang: string, widgets:Array<IWidget>) {
    if (!widgets || widgets.length === 0) {
        miro.showErrorNotification('Please select widgets for highlighting');
        return;
    }

    { // set up theme context
        const theme = themeRegistry.getTheme(settings.getTheme())
        if (!ThemeContext.getInstance().hasTheme() || ThemeContext.getInstance().currentTheme.getName() !== theme.getName()) {
            ThemeContext.getInstance().currentTheme = theme;
        }
    }

    let count = 0;
    let errorNotification = '';

    for (let i = 0; i < widgets.length; i++) {
        let widget = widgets[i];
        let widgetText = getWidgetText(widget);
        let plainText = getPlainText(widgetText);
        if (!plainText || plainText == '') {
            return;
        }
        let highlightedText = await highlighter.highlight(lang, plainText);
        if (highlightedText.length >= MAX_TEXT_SIZE) {
            if (errorNotification === '') {
                errorNotification = `Highlight failed, due to possible loss of data. One of highlighted text length: ${highlightedText.length}, limit: ${MAX_TEXT_SIZE}`;
            }
            const message = `Highlighted length: ${highlightedText.length} Cleaned length: ${plainText.length}  Widget text length: ${widgetText.length}`;
            Sentry.captureMessage(message);
            console.warn(message);
            continue;
        }
        let updateData:any = {
            id: widget.id,
            style: {
                textAlign: 'l',
                textAlignVertical: 't',
                underline: -1,
                bold: -1
            },
            text: highlightedText
        };

        let backgroundColor = ThemeContext.getInstance().currentTheme.getBackgroundColor();
        if (backgroundColor != null){
            updateData.style.backgroundColor = backgroundColor;
        }

        let textColor = ThemeContext.getInstance().currentTheme.getTextColor();
        if (textColor != null){
            updateData.style.textColor = textColor;
        }

        try {
            await miro.board.widgets.update(updateData);
            count++;
        } catch (e) {
            console.error(e);
        }
    }
    if (errorNotification !== ''){
        await miro.showErrorNotification(`Highlighted ${count} widgets. ` + errorNotification);
    } else {
        await miro.showNotification(`Highlighted ${count} widgets`);
    }
}

const BLOCK_ELEMENTS = new Map<string, number>([
    ['p',  1],
    ['div',  1],
    ['h1',  1],
    ['h2',  1],
    ['h3',  1],
    ['h4',  1],
    ['h5',  1],
    ['h6',  1],
    ['ul',  1],
    ['ol',  1],
    ['li',  1],
    ['code',  1],
    ['br',  1]
]);

function getPlainText(widgetText: string) {
    let div = document.createElement('div');
    div.innerHTML = widgetText;
    return computePlainText(div);


    function computePlainText(parentElement: Node) {
        let text = '';
        const children = parentElement.childNodes;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.nodeType === Node.TEXT_NODE) {
                text += child.textContent;
            }
            let childText = '';
            if (child.hasChildNodes()) {
                childText = computePlainText(child);
            }

            if (isBlockElement(child)) {
                if (childText !== '\n') {
                    text += childText;
                }
                text += '\n';
            } else {
                text += childText;
            }
        }
        return text;
    }

    function isBlockElement(node: Node) {
        if (node instanceof HTMLElement){
            return BLOCK_ELEMENTS.get(node.tagName.toLowerCase()) === 1;
        }
        return false;
    }
}