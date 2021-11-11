import {DOMProcessor} from "./prism-language-highlighter";
import {DOM} from "../config";
import {ThemeContext} from "./themes/interfaces";

export class PrismDOMProcessor implements DOMProcessor {
    private _lang: string;
    private _tokenFactory: TokenFactory;

    constructor(lang:string, nodeFactory: TokenFactory) {
        this._lang = lang;
        this._tokenFactory = nodeFactory;
    }

    process(html: string): string {
        const normalizedHtml = PrismDOMProcessor.replacesBreaks(PrismDOMProcessor.replaceTabs(html));
        let source = DOM.create('div');
        source.innerHTML = normalizedHtml;
        let out = DOM.create('div');
        this.transform(source, out);
        return out.innerHTML;
    }

    private static replaceTabs(html: string): string {
        return html.replace(/(\t)/g, '    ');
    }

    private static replacesBreaks(html:string): string  {
        return html.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }

    private transform(parent: Node, out: Node) {
        parent.childNodes.forEach(child => {
            const converted = this.convert(child);
            if (converted !== false) {
                this.applyStyles(converted);
                out.appendChild(converted);
            }
            if (child.hasChildNodes()) {
                this.transform(child, converted !== false ? converted : out);
            }
            this.convert(child)
        })
    }

    private convert(source: Node): Node | false {
        if (!(source instanceof HTMLElement)) {
            return source.cloneNode(false);
        }
        const element: HTMLElement = source;

        if (element.tagName === 'P' && !element.hasChildNodes()) {
            return DOM.create('br');
        }

        if (!PrismDOMProcessor.isToken(element)) {
            return element.cloneNode(false);
        }

        const classNames = element.className.split(' ');
        if (classNames.length < 2) {
            return element.cloneNode(false);
        }
        let result = this._tokenFactory.create(classNames[1], element.className);
        if (result == null) {
            console.warn(`Unknown token ${classNames[1]}`);
        }
        return result == null ? element.cloneNode(false) : result;
    }

    private static isToken(element: HTMLElement) {
        return element.className && element.className.startsWith('token ');
    }

    private applyStyles(target: Node) {
        if (!(target instanceof HTMLElement)){
            return;
        }
        ThemeContext.getInstance().currentTheme.applyStyle(this._lang, target.className, target);
        target.removeAttribute('class');
    }
}