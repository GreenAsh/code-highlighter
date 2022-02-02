import {DEFAULT_LANGUAGE, DEFAULT_THEME, LANGUAGES} from "../code-highlighter/config";
import {themeRegistry} from "../code-highlighter/prism/themes";

export const settings =  {
    _themeKey: 'ch_theme',
    _defaultTheme: DEFAULT_THEME,
    hasTheme(): boolean {
        const theme = localStorage.getItem(this._themeKey);
        switch (theme) {
            case null:
            case undefined:
            case '':
                return false;
            default:
                return themeRegistry.hasTheme(theme);
        }
    },
    getTheme(): string {
        let theme = localStorage.getItem(this._themeKey);
        if (theme == null) {
            return themeRegistry.getTheme(this._defaultTheme).getName();
        }
        return themeRegistry.getTheme(theme).getName();
    },
    setTheme(theme:string) {
        localStorage.setItem(this._themeKey, themeRegistry.getTheme(theme).getName());
    }
};