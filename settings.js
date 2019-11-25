const code = {
    highlighter: {
        settings: {
            _langKey_fallback_1: 'code.highlighter.lang',
            _langKey: 'ch_lang',
            _themeKey: 'ch_theme',
            _defaultLang: 'ts',
            languages:{
                'java': 1,
                'js': 1,
                'ts': 1
            },
            themes: {
                'Default (PrismJS)': 'default',
                'Meterial Light': 'material-light',
                'Light Transparent (idea)': 'idea',
                'VS Theme': 'vs',
                'Okaidia': 'okaidia',
                'Tomorrow Night': 'tomorrow-night'
            },
            getLang: function() {
                const lang = this._getLang(this._langKey, this._getLang(this._langKey_fallback_1, this._defaultLang));
                if (lang !== this._defaultLang){
                    this.setLang(lang); // overwrite fallback
                }
                return lang;
            },
            _getLang(propertyKey, defaultValue){
                const value = localStorage.getItem(propertyKey);
                if (this.languages[value] === 1){
                    return value;
                } else {
                    return defaultValue;
                }
            },
            setLang: function(value) {
                if (this.languages[value] === 1){
                    localStorage.setItem(this._langKey, value);
                    localStorage.removeItem(this._langKey_fallback_1); // overwrite fallback key
                }
            },
            isLangStored(){
                const lang = localStorage.getItem(this._langKey);
                return this.languages[lang] === 1;
            },
            getTheme() {
                return localStorage.getItem(this._themeKey);
            },
            setTheme(theme) {
                localStorage.setItem(this._themeKey, theme);
            }
        }
    }
};