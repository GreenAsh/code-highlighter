export interface Theme {
    getName(): string;
    getDisplayName(): string;
    getBackgroundColor(): string | null;
    getTextColor(): string | null;
    applyStyle(lang:string, classNames:string, element: HTMLElement):void
}

export interface ThemeRegistry {
    getTheme(theme: string): Theme
    hasTheme(theme: string): boolean
    listThemes(): Theme
}

export class ThemeContext {
    private static _instance: ThemeContext

    /**
     * Returns a singleton instance of object
     */
    public static getInstance(): ThemeContext {
        if (!ThemeContext._instance){
            ThemeContext._instance = new ThemeContext();
        }
        return ThemeContext._instance;
    }

    private _currentTheme: Theme | null;

    private constructor() {
        this._currentTheme = null;
    }

    /**
     * Return true if theme is being set
     */
    public hasTheme(): boolean {
        return this._currentTheme !== null
    }

    public get currentTheme(): Theme {
        if (this._currentTheme !== null) {
            return this._currentTheme;
        }
        throw new Error(`There is no theme in context`);
    }

    public set currentTheme(value: Theme) {
        this._currentTheme = value;
    }
}