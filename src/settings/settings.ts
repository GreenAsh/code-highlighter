import {DEFAULT_LANGUAGE, LANGUAGES} from "../code-highlighter/config";

export default {
    _langKey: 'code.highlighter.lang',
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
    }
};