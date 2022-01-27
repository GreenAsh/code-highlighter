export const LANGUAGES = ['java', 'js', 'ts', 'gherkin'];
export const DEFAULT_THEME = 'okaidia';

export class DOM {
    public static createElement(tagName:string, className: string): HTMLElement {
        const result = document.createElement(tagName);
        result.className = className;
        return result;
    }
    public static create(tagName:string): HTMLElement {
        return document.createElement(tagName);
    }
};