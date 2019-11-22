const code = {
    highlighter: {
        settings: {
            _langKey: 'code.highlighter.lang',
            _defaultLang: 'ts',
            languages:{
                'java': 1,
                'kotlin': 0,
                'javastacktrace':1,
                'clike': 1,
                'csharp': 0,
                'php': 0,
                'sql': 0,
                'jsonp': 1,
                'http': 1,
                'xml': 0,
                'html': 0,
                'css': 0,
                'ts': 1,
                'js': 1
            },
            getLang: function() {
                const lang = localStorage.getItem(this._langKey);
                if (this.languages[lang] === 1){
                    return lang;
                } else {
                    return this._defaultLang;
                }
            },
            setLang: function(value) {
                if (this.languages[value] === 1){
                    localStorage.setItem(this._langKey, value);
                }
            },
            isLangStored(){
                const lang = localStorage.getItem(this._langKey);
                return this.languages[lang] === 1;
            }
        }
    }
};