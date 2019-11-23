import {CodeHighlighter, LanguageHighlighter} from "../index";
// import InlineCss from "inline-css";

export class CodeHighlighterImpl implements CodeHighlighter {
    private static _instance: CodeHighlighterImpl;

    public static getInstance(): CodeHighlighterImpl {
        if (!CodeHighlighterImpl._instance){
            CodeHighlighterImpl._instance = new CodeHighlighterImpl();
        }
        return CodeHighlighterImpl._instance;
    }

    private _languages: Map<string, LanguageHighlighter> = new Map<string, LanguageHighlighter>();

    getLanguages(): Array<LanguageHighlighter> {
        return Array.from(this._languages.values());
    }

    register(language: LanguageHighlighter): void {
        this._languages.set(language.getName(), language);
    }

    async highlight(lang: string, text: string): Promise<string> {
        const language = this._languages.get(lang);
        if (!language) {
            throw new Error(`${lang} language not found`);
        }

        // return await InlineCss(language.highlight(text), {
        //     url: '../css/default.css'
        // });
        return language.highlight(text);
    }
}