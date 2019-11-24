import {DefaultThemeRegistry} from "./DefaultThemeRegistry";
import {ThemeImpl} from "./ThemeImpl";
import {ThemeContext} from "./interfaces";

import defaultData from "./data/default.theme"
const defaultTheme = new ThemeImpl('default','black',  '#f5f2f0', defaultData);

export const themeRegistry = new DefaultThemeRegistry(defaultTheme);
// register themes
import okadiaData from "./data/okaidia.theme"
themeRegistry.register(new ThemeImpl('okaidia', '#f8f8f2', '#272822', okadiaData));

import ideaData from "./data/idea.theme"
themeRegistry.register(new ThemeImpl('idea', 'black', 'transparent', ideaData));
//
themeRegistry.freeze();

ThemeContext.getInstance().currentTheme = themeRegistry.getTheme('idea');