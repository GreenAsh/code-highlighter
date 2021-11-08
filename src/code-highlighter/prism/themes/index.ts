import {DefaultThemeRegistry} from "./DefaultThemeRegistry";
import {ThemeImpl} from "./ThemeImpl";
// themes
import defaultData from "./data/default.theme"
import okadiaData from "./data/okaidia.theme"
import ideaData from "./data/idea.theme"
import tomorrowNightData from "./data/tomorrow-night.theme"
import vsData from "./data/vs.theme"
import materialLightData from "./data/material-light.theme"

const defaultTheme = new ThemeImpl('default', 'Prism', '#000000', '#f5f2f0', defaultData);

export const themeRegistry = new DefaultThemeRegistry(defaultTheme);
// register themes
themeRegistry.register(new ThemeImpl('okaidia', 'Okaidia', '#f8f8f2', '#272822', okadiaData));
themeRegistry.register(new ThemeImpl('idea', 'Light Transparent (idea)', '#000000', 'transparent', ideaData));
themeRegistry.register(new ThemeImpl('tomorrow-night', 'Tomorrow Night', '#ccc', '#2d2d2d', tomorrowNightData));
themeRegistry.register(new ThemeImpl('vs', 'VS Code', '#393A34', '#fff', vsData));
themeRegistry.register(new ThemeImpl('material-light', 'Meterial Light', '#90a4ae', '#fafafa', materialLightData));
//
themeRegistry.freeze();