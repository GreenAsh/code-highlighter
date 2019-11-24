export interface Theme {
    getName(): string;
    getBackgroundColor(): string | null;
    getTextColor(): string | null;
    applyStyle(lang:string, classNames:string, element: HTMLElement):void
}

export interface ThemeRegistry {
    getTheme(theme: string): Theme
    listThemes():string[]
}

export class ThemeContext {
    private static _instance: ThemeContext;
    public static getInstance(){
        if (!ThemeContext._instance){
            ThemeContext._instance = new ThemeContext();
        }
        return ThemeContext._instance;
    }

    private _currentTheme: Theme | null;

    constructor() {
        this._currentTheme = null;
    }

    get currentTheme(): Theme {
        if (this._currentTheme != null) {
            return this._currentTheme;
        } else {
            throw new Error(`There is no colorizer in context`);
        }
    }

    set currentTheme(value: Theme) {
        this._currentTheme = value;
    }
}