import {LanguageHighlighter} from "../index";
import * as Prism from "prismjs";

export interface DOMProcessor {
    process(html: string): string;
}

export class PrismLanguageHighlighter implements LanguageHighlighter {
    private readonly _lang: string;
    private readonly _domProcessor: DOMProcessor;

    constructor(lang: string, postHighlighter: DOMProcessor) {
        this._lang = lang;
        this._domProcessor = postHighlighter;
    }

    getName(): string {
        return this._lang;
    }

    highlight(text: string): string {
        return this._domProcessor.process(
            Prism.highlight(text, Prism.languages[this._lang], this._lang)
        );
    }
}