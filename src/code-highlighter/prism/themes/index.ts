import {DefaultThemeRegistry} from "./DefaultThemeRegistry";
import {ThemeImpl} from "./ThemeImpl";
import {ThemeContext} from "./interfaces";

import defaultData from "./data/default.theme"
const defaultTheme = new ThemeImpl('default', '#b3d4fc', defaultData);

export const themeRegistry = new DefaultThemeRegistry(defaultTheme);
// register themes
import okadiaData from "./data/okaidia.theme"
themeRegistry.register(new ThemeImpl('okaidia', '#272822', okadiaData));
//
themeRegistry.freeze();

ThemeContext.getInstance().currentTheme = defaultTheme;