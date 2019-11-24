import {ThemeRegistrar} from "./private-interfaces";
import {ThemeRegistry, Theme} from "./interfaces";

export class DefaultThemeRegistry implements ThemeRegistry, ThemeRegistrar {
    private readonly _theme2Object = new Map<string, Theme>();
    private readonly _defaultTheme: Theme;
    private _freezed = false;

    constructor(defaultTheme: Theme) {
        this._defaultTheme = defaultTheme;
        this._theme2Object.set(defaultTheme.getName(), defaultTheme);
    }

    getTheme(theme: string): Theme {
        const result = this._theme2Object.get(theme);
        if (result == null){
            console.warn(`Theme ${theme} not found`);
            return this._defaultTheme;
        }
        return result;
    }

    freeze(): void {
        if (!this._freezed) {
            this._freezed = true;
        } else {
            console.warn('Illegal state: trying to freeze already freezed ColorizerRegistry');
        }
    }

    register(theme: Theme): void {
        if (this._freezed){
            throw new Error(`Can't register theme '${name} because registry has been frozen'`);
        }
        this._theme2Object.set(theme.getName(), theme);
    }
}