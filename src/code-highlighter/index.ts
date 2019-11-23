export interface LanguageHighlighter {
    getName(): string
    highlight(text: string): string;
}

export interface CodeHighlighter {
    getLanguages(): Array<LanguageHighlighter>
    /**
     * @param lang
     * @param text
     * @throws error if {@param lang} not found
     */
    highlight(lang: string, text: string): Promise<string>
}

