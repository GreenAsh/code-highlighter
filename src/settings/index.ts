import {themeRegistry} from '../code-highlighter/prism/themes';
import {settings} from './shared-settings';

/**
 * some doc
 */
function initPage() {
    settings.getMenuButtons().forEach((value, index) => {
        initLanguages(value, index);
    })

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

function initLanguages(value: string, index:number) {
    const langSelector = document.getElementById('lang' + index) as HTMLSelectElement
    const langArray = settings.getAvailableLanguages();
    for (const lang of langArray) {
        if (index === 0 && lang.key === 'none') {
            continue
        }
        const langOption = document.createElement('option');
        langOption.textContent = lang.displayName;
        langOption.value = lang.key;
        langOption.selected = lang.key === value;
        langSelector.appendChild(langOption);
    }
    langSelector.onchange = () => {
        const selectedLang = langSelector.options[langSelector.selectedIndex].value;
        settings.setMenuButton(index, selectedLang);
    };
}

initPage();