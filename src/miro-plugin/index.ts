import IWidget = SDK.IWidget;
import * as Sentry from '@sentry/browser';
import {default as highlighter} from '../code-highlighter/prism';
import {langKey2Description, LanguageDescription, settings} from '../settings/shared-settings'
import {ThemeContext} from "../code-highlighter/prism/themes/interfaces";
import {themeRegistry} from "../code-highlighter/prism/themes";
import {DEFAULT_THEME} from "../code-highlighter/config";
import {langKey2IconData, mainIcon} from "./icons";
import IContextMenuItem = SDK.IContextMenuItem;

function getWidgetText(widget: any): string {
    if (widget.text){
        return widget.text;
    } else {
        return '';
    }
}

// const icon24 = `<g id="Layer_1">
//     <path d="M9.514,2.535 C4.872,2.293 8.62,9.297 6.696,11.438 C6.561,11.588 3.21,12.082 3.686,12.737 C4.325,13.618 6.049,12.871 6.905,14.297 C8.801,17.453 5.576,21.746 10.138,22.471" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//     <path d="M14.411,22.42 C19.04,22.845 15.567,15.729 17.574,13.674 C17.714,13.53 21.082,13.171 20.632,12.501 C20.027,11.599 18.276,12.274 17.476,10.822 C15.704,7.607 19.094,3.463 14.563,2.561" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//   </g>`;
//
// const java_1 = `<g id="Layer_1">
//     <g>
//       <path d="M11.52,11.143 C10.635,11.143 2.88,11.065 2.88,8.36 C2.88,7.292 4.101,6.505 6.509,6.02 C7.025,5.917 7.539,6.206 7.656,6.668 C7.773,7.13 7.448,7.589 6.931,7.693 C5.752,7.93 5.156,8.2 4.907,8.364 C5.542,8.799 7.947,9.428 11.52,9.428 C13.628,9.428 15.621,9.205 16.989,8.816 C17.491,8.672 18.033,8.922 18.195,9.373 C18.356,9.824 18.077,10.306 17.571,10.45 C16.023,10.89 13.817,11.143 11.52,11.143 z" fill="#000000"/>
//       <path d="M11.246,14.571 C9.307,14.571 4.8,14.375 4.8,12.559 C4.8,12.164 5.02,11.609 6.07,11.211 C6.557,11.024 7.122,11.229 7.329,11.665 C7.459,11.936 7.419,12.235 7.252,12.465 C8.021,12.661 9.387,12.857 11.246,12.857 C12.737,12.857 14.146,12.725 15.113,12.495 C15.627,12.37 16.151,12.645 16.288,13.102 C16.424,13.56 16.12,14.03 15.608,14.151 C14.47,14.422 12.921,14.571 11.246,14.571 z" fill="#000000"/>
//       <path d="M10.971,18 C8.855,18 6.72,17.378 6.72,15.987 C6.72,15.71 6.826,15.178 7.536,14.728 C7.969,14.455 8.568,14.547 8.874,14.933 C9.124,15.249 9.102,15.663 8.85,15.953 C9.235,16.111 9.978,16.286 10.971,16.286 C11.773,16.286 12.55,16.167 13.05,15.968 C13.535,15.776 14.101,15.971 14.317,16.404 C14.532,16.836 14.314,17.343 13.83,17.535 C13.074,17.835 12.059,18 10.971,18 z" fill="#000000"/>
//       <path d="M10.56,21.429 C9.479,21.429 0,21.344 0,18.428 C0,17.095 1.94,16.519 2.577,16.329 C3.081,16.183 3.624,16.423 3.791,16.872 C3.958,17.321 3.686,17.806 3.183,17.956 C2.525,18.151 2.19,18.326 2.029,18.435 C2.77,18.95 5.86,19.714 10.56,19.714 C15.563,19.714 18.74,18.849 19.205,18.339 C19.255,17.908 19.663,17.571 20.16,17.571 C20.69,17.571 21.12,17.955 21.12,18.428 C21.12,21.344 11.64,21.429 10.56,21.429 z" fill="#000000"/>
//       <path d="M9.75,24 C9.263,24 8.859,23.994 8.593,23.983 C8.064,23.961 7.655,23.559 7.681,23.086 C7.707,22.612 8.152,22.236 8.686,22.271 C9.65,22.312 12.749,22.263 14.605,22.176 C19.008,21.972 21.591,20.951 22.078,20.493 C22.116,20.118 22.429,19.797 22.865,19.728 C23.384,19.643 23.885,19.954 23.979,20.42 C24.031,20.678 24.012,21.077 23.628,21.51 C22.556,22.716 18.886,23.694 14.705,23.889 C13.265,23.956 11.16,24 9.75,24 z" fill="#000000"/>
//       <path d="M19.201,15.428 C18.899,15.428 18.601,15.301 18.415,15.064 C18.11,14.677 18.214,14.142 18.649,13.87 C18.674,13.854 21.43,12.073 22.017,9.065 C22.17,8.281 22.058,7.253 21.61,6.96 C21.282,6.745 20.565,6.867 19.642,7.294 C19.171,7.511 18.592,7.348 18.348,6.927 C18.104,6.507 18.288,5.989 18.758,5.772 C20.422,5.001 21.763,4.936 22.744,5.577 C24.384,6.65 23.962,9.085 23.909,9.359 C23.182,13.084 19.892,15.185 19.752,15.272 C19.584,15.378 19.391,15.428 19.201,15.428 z" fill="#000000"/>
//       <path d="M10.892,8.571 C10.638,8.571 10.384,8.482 10.195,8.303 L9.386,7.541 C8.486,6.694 8.385,5.384 9.147,4.426 L10.408,2.842 C10.581,2.625 10.609,2.326 10.478,2.08 L10.024,1.223 C9.797,0.796 10.002,0.285 10.481,0.082 C10.961,-0.119 11.533,0.062 11.76,0.49 L12.214,1.347 C12.643,2.156 12.551,3.11 11.973,3.835 L10.712,5.419 C10.488,5.701 10.517,6.116 10.779,6.363 L11.589,7.125 C11.953,7.468 11.937,8.011 11.553,8.336 C11.367,8.493 11.129,8.571 10.892,8.571 z" fill="#000000"/>
//       <path d="M14.654,8.571 C14.414,8.571 14.175,8.491 13.988,8.332 L13.228,7.679 C12.331,6.908 12.23,5.668 12.993,4.794 L14.178,3.437 C14.373,3.213 14.421,3.015 14.393,2.967 C14.148,2.547 14.331,2.029 14.802,1.811 C15.272,1.591 15.852,1.756 16.097,2.175 C16.502,2.871 16.351,3.737 15.692,4.491 L14.507,5.848 C14.346,6.033 14.367,6.278 14.56,6.443 L15.32,7.096 C15.702,7.424 15.714,7.966 15.346,8.308 C15.158,8.483 14.906,8.571 14.654,8.571 z" fill="#000000"/>
//     </g>
//   </g>`;
//
// const js_2 = `<g id="Layer_1">
//     <path d="M10.431,3.96 C10.563,5.805 10.554,7.793 10.644,9.699 C11.382,25.336 5.116,21.928 4.856,16.431" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//     <path d="M20.144,9.359 C18.761,8.017 16.73,8.934 16.452,10.94 C16.036,13.938 20.28,15.235 19.821,18.545 C19.307,22.249 15.336,21.508 14.732,18.425" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//   </g>`;
//
// const ts_3 = `<g id="Layer_1">
//     <path d="M9.538,4.824 C9.586,10.282 9.171,15.926 9.171,21.19" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//     <path d="M2.781,3.812 C7.649,3.766 12.313,4.334 16.988,3.812" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//     <path d="M20.428,9.509 C19.046,8.167 17.015,9.085 16.737,11.09 C16.321,14.088 20.565,15.385 20.106,18.695 C19.592,22.399 15.62,21.658 15.017,18.575" fill-opacity="0" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//   </g>`;

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