import {Theme} from "./interfaces";

export interface ThemeRegistrar {
    register(theme: Theme):void

    freeze(): void;
}