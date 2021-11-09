(()=>{"use strict";class o{constructor(o,n,e,t,r){this._name=o,this._displayName=n,this._textColor=e,this._backgroundColor=t,this._themeData=JSON.parse(r)}getName(){return this._name}getDisplayName(){return this._displayName}getTextColor(){return this._textColor}getBackgroundColor(){return this._backgroundColor}applyStyle(o,n,e){""!==n&&n.replace(/-/g,"_").split(" ").forEach((n=>{"token"!==n&&(this.mergeStyle(n,e,!0),this.mergeStyle(`${o}_${n}`,e,!1))}))}mergeStyle(o,n,e){if(this._themeData[o]){let e=this._themeData[o];for(let o in e)n.style.setProperty(o,e[o])}else e&&console.warn(`Unknown style class name ${o}`)}}const n=new o("default","Prism","#000000","#f5f2f0",'{"comment":{"color": "slategray"},"prolog":{"color": "slategray"},"doctype":{"color": "slategray"},"cdata":{"color": "slategray"},"punctuation":{"color": "#999"},"namespace":{"opacity": ".7"},"property":{"color": "#905"},"tag":{"color": "#905"},"boolean":{"color": "#905"},"number":{"color": "#905"},"constant":{"color": "#905"},"symbol":{"color": "#905"},"deleted":{"color": "#905"},"selector":{"color": "#690"},"attr_name":{"color": "#690"},"string":{"color": "#690"},"char":{"color": "#690"},"builtin":{"color": "#690"},"inserted":{"color": "#690"},"operator":{"color": "#9a6e3a","background": "hsla(0, 0%, 100%, .5)"},"entity":{"cursor": "help"},"url":{"color": "#9a6e3a","background": "hsla(0, 0%, 100%, .5)"},"atrule":{"color": "#07a"},"attr_value":{"color": "#07a"},"keyword":{"color": "#07a"},"function":{"color": "#DD4A68"},"class_name":{"color": "#DD4A68"},"regex":{"color": "#e90"},"important":{"fontWeight": "bold"},"variable":{"color": "#e90"},"bold":{"fontWeight": "bold"},"italic":{"fontStyle": "italic"},"css_string":{"color": "#9a6e3a","background": "hsla(0, 0%, 100%, .5)","annotation": {}}}'),e=new class{constructor(o){this._theme2Object=new Map,this._freezed=!1,this._defaultTheme=o,this._theme2Object.set(o.getName(),o)}getTheme(o){const n=this._theme2Object.get(o);return null==n?(console.warn(`Theme ${o} not found`),this._defaultTheme):n}hasTheme(o){return this._theme2Object.has(o)}listThemes(){return Array.from(this._theme2Object.values())}freeze(){this._freezed?console.warn("Illegal state: trying to freeze already freezed ColorizerRegistry"):this._freezed=!0}register(o){if(this._freezed)throw new Error(`Can't register theme '${name} because registry has been frozen'`);this._theme2Object.set(o.getName(),o)}}(n);e.register(new o("okaidia","Okaidia","#f8f8f2","#272822",'{"comment":{"color":"slategray"},"prolog":{"color":"slategray"},"doctype":{"color":"slategray"},"cdata":{"color":"slategray"},"punctuation":{"color":"#f8f8f2"},"namespace":{"opacity":".7"},"property":{"color":"#f92672"},"tag":{"color":"#f92672"},"constant":{"color":"#f92672"},"symbol":{"color":"#f92672"},"deleted":{"color":"#f92672"},"boolean":{"color":"#ae81ff"},"number":{"color":"#ae81ff"},"selector":{"color":"#a6e22e"},"attr_name":{"color":"#a6e22e"},"string":{"color":"#a6e22e"},"char":{"color":"#a6e22e"},"builtin":{"color":"#a6e22e"},"inserted":{"color":"#a6e22e"},"operator":{"color":"#f8f8f2"},"entity":{"cursor":"help"},"url":{"color":"#f8f8f2"},"language_css__string":{"color":"#f8f8f2"},"style__string":{"color":"#f8f8f2"},"variable":{"color":"#f8f8f2"},"atrule":{"color":"#e6db74"},"attr_value":{"color":"#e6db74"},"function":{"color":"#e6db74"},"class_name":{"color":"#e6db74"},"keyword":{"color":"#66d9ef"},"regex":{"color":"#fd971f"},"important":{"fontWeight":"bold"},"bold":{"fontWeight":"bold"},"italic":{"fontStyle":"italic"},"annotation":{"color":"#f92672"}}')),e.register(new o("idea","Light Transparent (idea)","#000000","transparent",'{"comment":{"color":"#808080"},"prolog":{"color":"#808080"},"doctype":{"color":"#808080"},"cdata":{"color":"#808080"},"punctuation":{"color":"#800080"},"interpolation":{"color":"#800080"},"interpolation_punctuation":{"color":"#800080"},"namespace":{"color":"#004A43"},"property":{"color":"#000080"},"boolean":{"color":"#000080"},"tag":{"color":"#000080"},"symbol":{"color":"#000080"},"deleted":{"color":"#000080"},"number":{"color":"#0000FF"},"selector":{"color":"#008000"},"attr_name":{"color":"#008000"},"string":{"color":"#008000"},"template_punctuation":{"color":"#008000"},"char":{"color":"#008000"},"inserted":{"color":"#008000"},"atrule":{"color":"#000080"},"attr_value":{"color":"#000080"},"keyword":{"color":"#000080"},"function":{"color":"#000080"},"regex":{"color":"#660E7A"},"important":{"color":"#660E7A"},"variable__parameter":{"color":"#660E7A"},"constant":{"color":"#660E7A"},"builtin":{"color":"#660E7A"},"function_variable":{"color":"#660E7A"},"class_name":{"color":"#660E7A"},"annotation":{"color":"#808000"},"template_string":{"color":"#20999D"},"source":{"color":"#20999D"},"generics":{"color":"#20999D"}}')),e.register(new o("tomorrow-night","Tomorrow Night","#ccc","#2d2d2d",'{\n  "comment": {\n    "color": "#999"\n  },\n  "block_comment": {\n    "color": "#999"\n  },\n  "prolog": {\n    "color": "#999"\n  },\n  "doctype": {\n    "color": "#999"\n  },\n  "cdata": {\n    "color": "#999"\n  },\n  "punctuation": {\n    "color": "#ccc"\n  },\n  "tag": {\n    "color": "#e2777a"\n  },\n  "attr_name": {\n    "color": "#e2777a"\n  },\n  "namespace": {\n    "color": "#e2777a"\n  },\n  "deleted": {\n    "color": "#e2777a"\n  },\n  "function_name": {\n    "color": "#6196cc"\n  },\n  "boolean": {\n    "color": "#f08d49"\n  },\n  "number": {\n    "color": "#f08d49"\n  },\n  "function": {\n    "color": "#f08d49"\n  },\n  "property": {\n    "color": "#f8c555"\n  },\n  "class_name": {\n    "color": "#f8c555"\n  },\n  "constant": {\n    "color": "#f8c555"\n  },\n  "symbol": {\n    "color": "#f8c555"\n  },\n  "selector": {\n    "color": "#cc99cd"\n  },\n  "important": {\n    "fontWeight": "bold"\n  },\n  "atrule": {\n    "color": "#cc99cd"\n  },\n  "keyword": {\n    "color": "#cc99cd"\n  },\n  "builtin": {\n    "color": "#cc99cd"\n  },\n  "string": {\n    "color": "#7ec699"\n  },\n  "char": {\n    "color": "#7ec699"\n  },\n  "attr_value": {\n    "color": "#7ec699"\n  },\n  "regex": {\n    "color": "#7ec699"\n  },\n  "variable": {\n    "color": "#7ec699"\n  },\n  "operator": {\n    "color": "#67cdcc"\n  },\n  "entity": {\n    "cursor": "help"\n  },\n  "url": {\n    "color": "#67cdcc"\n  },\n  "bold": {\n    "fontWeight": "bold"\n  },\n  "italic": {\n    "fontStyle": "italic"\n  },\n  "inserted": {\n    "color": "green"\n  }\n}')),e.register(new o("vs","VS Code","#393A34","#fff",'{\n  "comment": {\n    "color": "#008000",\n    "fontStyle": "italic"\n  },\n  "prolog": {\n    "color": "#008000",\n    "fontStyle": "italic"\n  },\n  "doctype": {\n    "color": "#008000",\n    "fontStyle": "italic"\n  },\n  "cdata": {\n    "color": "#008000",\n    "fontStyle": "italic"\n  },\n  "namespace": {\n    "opacity": ".7"\n  },\n  "string": {\n    "color": "#A31515"\n  },\n  "punctuation": {\n    "color": "#393A34"\n  },\n  "operator": {\n    "color": "#393A34"\n  },\n  "url": {\n    "color": "#36acaa"\n  },\n  "symbol": {\n    "color": "#36acaa"\n  },\n  "number": {\n    "color": "#36acaa"\n  },\n  "boolean": {\n    "color": "#36acaa"\n  },\n  "variable": {\n    "color": "#36acaa"\n  },\n  "constant": {\n    "color": "#36acaa"\n  },\n  "inserted": {\n    "color": "#36acaa"\n  },\n  "atrule": {\n    "color": "#0000ff"\n  },\n  "keyword": {\n    "color": "#0000ff"\n  },\n  "attr_value": {\n    "color": "#0000ff"\n  },\n  "autohotkey_selector": {\n    "color": "#0000ff"\n  },\n  "json_boolean": {\n    "color": "#0000ff"\n  },\n  "json_number": {\n    "color": "#0000ff"\n  },\n  "css_code_class": {\n    "color": "#0000ff"\n  },\n  "function": {\n    "color": "#393A34"\n  },\n  "deleted": {\n    "color": "#9a050f"\n  },\n  "autohotkey_tag": {\n    "color": "#9a050f"\n  },\n  "selector": {\n    "color": "#800000"\n  },\n  "autohotkey_keyword": {\n    "color": "#00009f"\n  },\n  "important": {\n    "fontWeight": "bold"\n  },\n  "bold": {\n    "fontWeight": "bold"\n  },\n  "italic": {\n    "fontStyle": "italic"\n  },\n  "class_name": {\n    "color": "#2B91AF"\n  },\n  "json_property": {\n    "color": "#2B91AF"\n  },\n  "tag": {\n    "color": "#800000"\n  },\n  "attr_name": {\n    "color": "#ff0000"\n  },\n  "property": {\n    "color": "#ff0000"\n  },\n  "regex": {\n    "color": "#ff0000"\n  },\n  "entity": {\n    "color": "#ff0000"\n  }\n}')),e.register(new o("material-light","Meterial Light","#90a4ae","#fafafa",'{\n  "css": {\n    "color": "#f76d47"\n  },\n  "sass": {\n    "color": "#f76d47"\n  },\n  "scss": {\n    "color": "#f76d47"\n  },\n  "namespace": {\n    "opacity": "0.7"\n  },\n  "atrule": {\n    "color": "#7c4dff"\n  },\n  "attr_name": {\n    "color": "#39adb5"\n  },\n  "attr_value": {\n    "color": "#f6a434"\n  },\n  "attribute": {\n    "color": "#f6a434"\n  },\n  "boolean": {\n    "color": "#7c4dff"\n  },\n  "builtin": {\n    "color": "#39adb5"\n  },\n  "cdata": {\n    "color": "#39adb5"\n  },\n  "char": {\n    "color": "#39adb5"\n  },\n  "class": {\n    "color": "#39adb5"\n  },\n  "class_name": {\n    "color": "#6182b8"\n  },\n  "comment": {\n    "color": "#aabfc9"\n  },\n  "constant": {\n    "color": "#7c4dff"\n  },\n  "deleted": {\n    "color": "#e53935"\n  },\n  "doctype": {\n    "color": "#aabfc9"\n  },\n  "entity": {\n    "color": "#e53935"\n  },\n  "function": {\n    "color": "#7c4dff"\n  },\n  "hexcode": {\n    "color": "#f76d47"\n  },\n  "id": {\n    "color": "#7c4dff",\n    "fontWeight": "bold"\n  },\n  "important": {\n    "color": "#7c4dff",\n    "fontWeight": "bold"\n  },\n  "inserted": {\n    "color": "#39adb5"\n  },\n  "keyword": {\n    "color": "#7c4dff"\n  },\n  "number": {\n    "color": "#f76d47"\n  },\n  "operator": {\n    "color": "#39adb5"\n  },\n  "prolog": {\n    "color": "#aabfc9"\n  },\n  "property": {\n    "color": "#39adb5"\n  },\n  "pseudo_class": {\n    "color": "#f6a434"\n  },\n  "pseudo_element": {\n    "color": "#f6a434"\n  },\n  "punctuation": {\n    "color": "#39adb5"\n  },\n  "regex": {\n    "color": "#6182b8"\n  },\n  "selector": {\n    "color": "#e53935"\n  },\n  "string": {\n    "color": "#f6a434"\n  },\n  "symbol": {\n    "color": "#7c4dff"\n  },\n  "tag": {\n    "color": "#e53935"\n  },\n  "unit": {\n    "color": "#f76d47"\n  },\n  "url": {\n    "color": "#e53935"\n  },\n  "variable": {\n    "color": "#e53935"\n  }\n}')),e.freeze();const t=["java","js","ts"],r={_langKey_fallback_1:"code.highlighter.lang",_langKey:"ch_lang",_themeKey:"ch_theme",_defaultLang:"ts",_defaultTheme:"okaidia",languages:t,getLang(){const o=this._getLang(this._langKey,this._getLang(this._langKey_fallback_1,this._defaultLang));return o!==this._defaultLang&&this.setLang(o),o},_getLang(o,n){const e=localStorage.getItem(o);for(let o=0;o<t.length;o++)if(e===t[o])return e;return n},setLang(o){for(let n=0;n<t.length;n++)o===t[n]&&(localStorage.setItem(this._langKey,o),localStorage.removeItem(this._langKey_fallback_1))},hasTheme(){const o=localStorage.getItem(this._themeKey);switch(o){case null:case void 0:case"":return!1;default:return e.hasTheme(o)}},getTheme(){let o=localStorage.getItem(this._themeKey);return null==o?e.getTheme(this._defaultTheme).getName():e.getTheme(o).getName()},setTheme(o){localStorage.setItem(this._themeKey,e.getTheme(o).getName())}};!function(){const o=document.getElementById("languages"),n=r.getLang(),t=r.languages;for(let e=0;e<t.length;e++){const r=t[e],l=document.createElement("option");l.textContent=r,l.value=r,l.selected=n===r,o.appendChild(l)}o.onchange=()=>{const n=o.options[o.selectedIndex].value;r.setLang(n)};const l=document.getElementById("themes_select"),c=e.listThemes();for(let o=0;o<c.length;o++){const n=c[o],e=document.createElement("option"),t=n.getName();e.textContent=n.getDisplayName(),e.value=t,e.selected=t===r.getTheme(),l.appendChild(e)}l.onchange=()=>{const o=l.options[l.selectedIndex].value;r.getTheme()!==o&&(r.setTheme(o),miro.showNotification("saved"))}}()})();