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
        const lang = langArray[i];
        const radioButton = document.createElement("label");
        radioButton.id = lang;
        radioButton.className = 'radiobutton';
        radioButton.tabIndex = i;
        radioButton.style.marginBottom = '4px';
        radioButton.innerHTML = `<input type="radio" value="0" name="radio" ${currentLang === lang ? 'checked=""' : ''}> <span>${lang}</span>`
        radioButton.onclick = () => {
            settings.setLang(lang);
        };
        languages.appendChild(radioButton);
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