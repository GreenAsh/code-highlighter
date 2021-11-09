import IWidget = SDK.IWidget;
import * as Sentry from '@sentry/browser';
import {default as highlighter} from '../code-highlighter/prism';
import {settings} from '../settings/shared-settings'
import {ThemeContext} from "../code-highlighter/prism/themes/interfaces";
import {themeRegistry} from "../code-highlighter/prism/themes";
import {DEFAULT_THEME} from "../code-highlighter/config";

function getWidgetText(widget: any): string {
    if (widget.text){
        return widget.text;
    } else {
        return '';
    }
}

const icon24 = `<g id="Layer_1">
    <path d="M9.514,2.535 C4.872,2.293 8.62,9.297 6.696,11.438 C6.561,11.588 3.21,12.082 3.686,12.737 C4.325,13.618 6.049,12.871 6.905,14.297 C8.801,17.453 5.576,21.746 10.138,22.471" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.411,22.42 C19.04,22.845 15.567,15.729 17.574,13.674 C17.714,13.53 21.082,13.171 20.632,12.501 C20.027,11.599 18.276,12.274 17.476,10.822 C15.704,7.607 19.094,3.463 14.563,2.561" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

const java_1 = `<g id="Layer_1">
    <path d="M7.419,2.535 C2.777,2.293 6.525,9.297 4.601,11.438 C4.466,11.588 1.115,12.082 1.591,12.737 C2.23,13.618 3.954,12.871 4.81,14.297 C6.706,17.453 3.481,21.746 8.043,22.471" fill-opacity="0" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.726,4.153 C17.692,8.795 19.027,14.352 17.327,18.971 C14.346,27.074 6.646,13.662 10.881,20.239" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.428,3.604 C15.064,3.852 18.086,3.629 20.594,3.337" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

const js_2 = `<g id="Layer_1">
    <path d="M10.431,3.96 C10.563,5.805 10.554,7.793 10.644,9.699 C11.382,25.336 5.116,21.928 4.856,16.431" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20.144,9.359 C18.761,8.017 16.73,8.934 16.452,10.94 C16.036,13.938 20.28,15.235 19.821,18.545 C19.307,22.249 15.336,21.508 14.732,18.425" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

const ts_3 = `<g id="Layer_1">
    <path d="M16.768,11.833 C16.226,10.225 14.316,10.241 13.33,11.792 C11.855,14.109 14.607,16.722 12.978,19.281 C11.156,22.144 8.399,20.088 9.125,17.33" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.054,2.182 C5.657,5.763 -1.968,21.279 8.548,14.558" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.964,3.772 C5.838,5.27 7.934,6.734 9.97,8.17" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.375,21.712 C22.004,22.136 18.531,15.02 20.537,12.966 C20.678,12.822 24.045,12.463 23.596,11.793 C22.991,10.891 21.24,11.566 20.439,10.113 C18.668,6.898 22.058,2.755 17.527,1.853" fill-opacity="0" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

const MAX_TEXT_SIZE = 5300;

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
                    svgIcon: icon24,
                    onClick: bottomBarAction
                };
            },
            getWidgetMenuItems: async (widgets) => {
                if (!hasAllowedWidgets(widgets)) {
                    return [];
                }
                return [{
                    tooltip: 'Java',
                    svgIcon: java_1,
                    onClick: async () => {
                        await contextMenuHighlight('java');
                    }
                }, {
                    tooltip: 'javascript',
                    svgIcon: js_2,
                    onClick: async () => {
                        await contextMenuHighlight('js');
                    }
                }, {
                    tooltip: 'typescript',
                    svgIcon: ts_3,
                    onClick: async () => {
                        await contextMenuHighlight('ts');
                    }
                }];
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
    const widgets = await miro.board.selection.get();
    if (widgets.length === 0){
        await showSettings();
    } else {
        await reselectWidgets(widgets);
        await highlightWidgets(settings.getLang(), widgets);
    }
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
        height: 250
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