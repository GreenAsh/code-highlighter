import {DOMProcessor} from "./prism-language-highlighter";
import {DOM} from "../config";

export class PrismDOMProcessor implements DOMProcessor {
    private _tokenFactory: TokenFactory;

    constructor(nodeFactory: TokenFactory) {
        this._tokenFactory = nodeFactory;
    }

    process(html: string): string {
        const normalizedHtml = PrismDOMProcessor.replacesBreaks(PrismDOMProcessor.replaceTabs(html));
        let source = DOM.createElement('div');
        source.innerHTML = normalizedHtml;
        let out = DOM.createElement('div');
        this.transform(source, out);
        return out.innerHTML;
    }

    private static replaceTabs(html: string): string {
        return html.replace(/(\t)/g, '    ');
    }

    private static replacesBreaks(html:string): string  {
        let result = html.replace(/\n/gm, '</p><p>');
        if (result.startsWith('</p>')){
            result = result.substring(4);
        } else {
            result = '<p>' + result;
        }
        if (result.endsWith('<p>')){
            result = result.substring(0, result.length - 3);
        } else {
            result += '</p>';
        }
        return result;
    }

    private transform(parent: Node, out: Node) {
        parent.childNodes.forEach(child => {
            const converted = this.convert(child);
            if (converted !== false) {
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
            return DOM.createElement('br');
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
}