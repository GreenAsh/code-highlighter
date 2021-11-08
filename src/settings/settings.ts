import {DEFAULT_LANGUAGE, DEFAULT_THEME, LANGUAGES} from "../code-highlighter/config";
import {themeRegistry} from "../code-highlighter/prism/themes";

export default {
    _langKey_fallback_1: 'code.highlighter.lang',
    _langKey: 'ch_lang',
    _themeKey: 'ch_theme',
    _defaultLang: DEFAULT_LANGUAGE,
    _defaultTheme: DEFAULT_THEME,
    languages: LANGUAGES,
    getLang(): string {
        const lang = this._getLang(this._langKey, this._getLang(this._langKey_fallback_1, this._defaultLang));
        if (lang !== this._defaultLang){
            this.setLang(lang); // overwrite fallback
        }
        return lang;
    },
    _getLang(propertyKey:string, defaultValue:string) : string {
        const value = localStorage.getItem(propertyKey);
        for (let i = 0; i < LANGUAGES.length; i++){
            if (value === LANGUAGES[i]){
                return value;
            }
        }
        return defaultValue;
    },
    setLang(value:string) {
        // todo cycle and previous one
        for (let i = 0; i < LANGUAGES.length; i++){
            if (value === LANGUAGES[i]){
                localStorage.setItem(this._langKey, value);
                localStorage.removeItem(this._langKey_fallback_1); // overwrite fallback key
            }
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