import IWidget = SDK.IWidget;
import * as Sentry from '@sentry/browser';
import {default as highlighter} from '../code-highlighter/prism';
import {default as settings} from '../settings/settings'
import ITextWidget = SDK.ITextWidget;
import {ThemeContext} from "../code-highlighter/prism/themes/interfaces";
import set = Reflect.set;
import {themeRegistry} from "../code-highlighter/prism/themes";

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

    await miro.initialize({
        extensionPoints: {
            bottomBar: async () => {
                return {
                    title: 'Code Highlighter',
                    svgIcon: icon24,
                    onClick: bottomBarAction
                };
            },
            getWidgetMenuItems: async () => {
                return  [{
                    tooltip: 'Code Highlighter',
                    svgIcon: icon24,
                    onClick: contextMenuHighlight
                }];
            }
        }
    })
});

async function hasPermission(permission: String) {
    let permissions = await miro.currentUser.getCurrentBoardPermissions();
    for (let i = 0; i < permissions.length; i++){
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
        await highlightWidgets(widgets);
    }
    await contextMenuHighlight(widgets);
}

async function reselectWidgets(widgets: IWidget[]) {
    let reselection = [];
    for (let widget in widgets) {
        reselection.push(widget.id);
    }
    if (reselection.length != 0) {
        // await miro.board.selection.clear();
        await miro.board.selection.selectWidgets(reselection)
    }
}

async function contextMenuHighlight(widgets: IWidget[]) {
    let fullData:IWidget[] = [];
    for (let widget in widgets) {
        const founded = await miro.board.widgets.get(widget);
        founded.forEach(value => fullData.push(value));
    }
    await highlightWidgets(fullData);
}

async function showSettings(){
    await miro.board.ui.openModal('settings.html', {
        width: 600,
        height: 300
    });
}

async function highlightWidgets(widgets:Array<IWidget>) {
    if (ThemeContext.getInstance().currentTheme.getName() != settings.getTheme()){
        ThemeContext.getInstance().currentTheme = themeRegistry.getTheme(settings.getTheme());
    }
    if (widgets.length == 0) {
        miro.showErrorNotification('Please select widgets for highlighting');
        return;
    }
    let count = 0;

    for (let widget in widgets) {
        let widgetText = getWidgetText(widget);
        let plainText = getPlainText(widgetText);
        if (!plainText || plainText == '') {
            return;
        }
        let highlightedText = await highlighter.highlight(settings.getLang(), plainText);
        if (highlightedText.length >= MAX_TEXT_SIZE) {
            miro.showErrorNotification('Highlight failed, due to possible loss of data');
            const message = `Highlighted length: ${highlightedText.length} Cleaned length: ${plainText.length}  Widget text length: ${widgetText.length}`;
            Sentry.captureMessage(message);
            console.warn(message);
            continue;
        }
        let updateData = {
            id: widget.id,
            style: {
                textAlign: 'l',
                textAlignVertical: 't',
                underline: -1,
                bold: -1
            },
            text: highlightedText
        };
        try {
            await miro.board.widgets.update(updateData);
            count++;
        } catch (e) {
            console.error(e);
        }
    }
    await miro.showNotification(`Highlighted ${count} widgets`);
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