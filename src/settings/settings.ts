import {DEFAULT_LANGUAGE, LANGUAGES} from "../code-highlighter/config";
import {ThemeContext} from "../code-highlighter/prism/themes/interfaces";
import {DefaultThemeRegistry} from "../code-highlighter/prism/themes/DefaultThemeRegistry";
import {themeRegistry} from "../code-highlighter/prism/themes";

export default {
    _langKey: 'code.highlighter.lang',
    _themeKey: 'ch_theme',
    _defaultLang: DEFAULT_LANGUAGE,
    languages: LANGUAGES,
    getLang(): string {
        return this._defaultLang;
        // const lang = localStorage.getItem(this._langKey);
        // if (this.languages[lang] === 1){
        //     return lang;
        // } else {
        //     return this._defaultLang;
        // }
    },
    getTheme(): string {
        let theme = localStorage.getItem(this._themeKey);
        if (theme == null) {
            return themeRegistry.getTheme('default').getName();
        }
        return themeRegistry.getTheme(theme).getName();
    },
    setTheme(theme:string) {
        localStorage.setItem(this._themeKey, themeRegistry.getTheme(theme).getName());
    }
};