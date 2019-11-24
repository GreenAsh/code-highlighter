import { Theme } from "./interfaces";
import {tryReadFile} from "tslint/lib/files/reading";

export class ThemeImpl implements Theme {
    private readonly _name: string;
    private readonly _backgroundColor: string | null;
    private readonly _themeData: any;

    constructor(name: string, backgroundColor: string | null, themeData: string) {
        this._name = name;
        this._backgroundColor = backgroundColor;
        this._themeData = JSON.parse(themeData);
    }

    getName(): string {
        return this._name
    }

    getBackgroundColor(): string | null {
        return this._backgroundColor;
    }

    applyStyle(lang:string, className:string, element: HTMLElement):void {
        if (className === ''){
            return;
        }
        let classNames = className.replace(/-/g, '_').split(' ');
        classNames.forEach(value => {
            if (value === 'token'){
                return;
            }
            this.mergeStyle(value, element, true);
            this.mergeStyle(`${lang}_${value}`, element, false);
        });
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