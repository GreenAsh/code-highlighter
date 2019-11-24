import {DefaultThemeRegistry} from "./DefaultThemeRegistry";
import {ThemeImpl} from "./ThemeImpl";
import {ThemeContext} from "./interfaces";

import defaultData from "./data/default.theme"
const defaultTheme = new ThemeImpl('default', null, defaultData);

export const themeRegistry = new DefaultThemeRegistry(defaultTheme);
// register themes
themeRegistry.freeze();

ThemeContext.getInstance().currentTheme = defaultTheme;