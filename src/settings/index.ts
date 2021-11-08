import {themeRegistry} from "../code-highlighter/prism/themes";
import {settings} from "./shared-settings";

/**
 * some doc
 */
function initPage() {
    const languages = document.getElementById('languages');
    const currentLang = settings.getLang();
    const langArray = settings.languages;
    for (let i = 0; i < langArray.length; i++) {
        const lang = langArray[i]
        const button = document.createElement("button");
        button.id = lang;
        button.className = `miro-btn miro-btn--${currentLang === lang ? 'primary' : 'secondary'} miro-btn--medium`;
        button.textContent = lang;
        button.onclick = () => {
            const selectedButton = document.getElementById(settings.getLang());
            selectedButton.className = selectedButton.className.replace('primary', 'secondary');
            settings.setLang(lang);
            button.className = button.className.replace('secondary', 'primary');
            miro.board.ui.closeModal();
        };
        languages.appendChild(button);
    }
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