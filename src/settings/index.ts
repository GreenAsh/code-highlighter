import {themeRegistry} from "../code-highlighter/prism/themes";
import {settings} from "./shared-settings";

/**
 * some doc
 */
function initPage() {
    const langSelect = document.getElementById('languages');
    const currentLang = settings.getLang();
    const langArray = settings.languages;
    for (let i = 0; i < langArray.length; i++) {
        const lang = langArray[i];
        const langOption = document.createElement('option');
        langOption.textContent = lang;
        langOption.value = lang;
        langOption.selected = currentLang === lang;
        langSelect.appendChild(langOption);
    }
    langSelect.onchange = () => {
        const selectedLang = langSelect.options[langSelect.selectedIndex].value;
        settings.setLang(selectedLang);
    };

    const themeChooser = document.getElementById('themes_select');
    const themes = themeRegistry.listThemes()
    for (let i = 0; i < themes.length; i++) {
        const theme = themes[i];
        const themeOption = document.createElement('option');
        const themId = theme.getName();
        themeOption.textContent = theme.getDisplayName();
        themeOption.value = themId;
        themeOption.selected = themId === settings.getTheme();
        themeChooser.appendChild(themeOption);
    }
    themeChooser.onchange = () => {
        const selectedTheme = themeChooser.options[themeChooser.selectedIndex].value;
        if (settings.getTheme() !== selectedTheme) {
            settings.setTheme(selectedTheme);
            miro.showNotification('saved');
        }
    };
}

initPage();