import {Theme} from "./interfaces";

export class ThemeImpl implements Theme {
    private readonly _name: string;
    private readonly _displayName: string;
    private readonly _textColor: string | null;
    private readonly _backgroundColor: string | null;
    private readonly _themeData: any;

    constructor(name: string, displayName: string, textColor: string | null, backgroundColor: string | null, themeData: string) {
        this._name = name;
        this._displayName = displayName;
        this._textColor = textColor;
        this._backgroundColor = backgroundColor;
        this._themeData = JSON.parse(themeData);
    }

    getName(): string {
        return this._name;
    }

    getDisplayName(): string {
        return this._displayName;
    }

    getTextColor(): string | null {
        return this._textColor;
    }

    getBackgroundColor(): string | null {
        return this._backgroundColor;
    }

    applyStyle(lang:string, className:string, element: HTMLElement):void {
        if (className === ''){
            return;
        }
        let classNames = className.replace(/-/g, '_').split(' ');
        const annotationClass = 'annotation';
        let hasAnnotation = false;
        classNames.forEach(value => {
            if (value === 'token') {
                return;
            }
            // remember if we had annotanion in class names
            // apply annotation styles later
            if (value === annotationClass) {
                hasAnnotation = true;
                return;
            }
            this.mergeStyle(value, element, true);
            this.mergeStyle(`${lang}_${value}`, element, false);
        });

        // java @annotation elements after prism conversion will have class name: "token annotation punctuation"
        // so the "punctuation" styles are always overrides "annotation" ones.
        if (hasAnnotation) {
            this.mergeStyle(annotationClass, element, true);
            this.mergeStyle(`${lang}_${annotationClass}`, element, false);
        }
    }

    private mergeStyle(className: string, element: HTMLElement, warn: boolean){
        if (this._themeData[className]) {
            let styleData = this._themeData[className];
            for (let property in styleData) {
                // noinspection JSUnfilteredForInLoop
                element.style.setProperty(property, styleData[property]);
            }
        } else if (warn) {
            console.warn(`Unknown style class name ${className}`);
        }
    }
}