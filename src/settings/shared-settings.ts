import {DEFAULT_THEME, LANGUAGES} from '../code-highlighter/config';
import {themeRegistry} from '../code-highlighter/prism/themes';

export interface LanguageDescription {
    key: string,
    displayName: string
}

export const langKey2Description: Map<string, LanguageDescription> = new Map([
    ['none', {key: 'none', displayName: 'None'}],
    ['java', {key: 'java', displayName: 'Java'}],
    ['js', {key: 'js', displayName: 'JavaScript'}],
    ['ts', {key: 'ts', displayName: 'TypeScript'}],
    ['gherkin', {key: 'gherkin', displayName: 'Gherkin'}]
]);
const defaultMenuButtons: string[] = ['java', 'js', 'ts']

function lsTest(): boolean{
    const test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

const storage: Storage = lsTest() ? localStorage : sessionStorage;

export const settings =  {
    _menuButtonsKey: 'ch_menu_buttons',
    _themeKey: 'ch_theme',
    _availableLanguages: [],
    _defaultTheme: DEFAULT_THEME,
    getAvailableLanguages(): LanguageDescription[] {
        return this._availableLanguages
    },
    getMenuButtons(): string[] {
        return JSON.parse(storage.getItem(settings._menuButtonsKey));
    },
    setMenuButton(index: number, key:string) {
        const _menuButtons = this.getMenuButtons()
        _menuButtons[index] = key
        this._setMenuButtons(_menuButtons)
    },
    _setMenuButtons(menuButtons:string[]) {
        storage.setItem(this._menuButtonsKey, JSON.stringify(menuButtons))
    },
    hasTheme(): boolean {
        const theme = storage.getItem(this._themeKey);
        switch (theme) {
            case null:
            case undefined:
            case '':
                return false;
            default:
                return themeRegistry.hasTheme(theme);
        }
    },
    getTheme(): string {
        let theme = storage.getItem(this._themeKey);
        if (theme === null) {
            return themeRegistry.getTheme(this._defaultTheme).getName();
        }
        return themeRegistry.getTheme(theme).getName();
    },
    setTheme(theme:string) {
        storage.setItem(this._themeKey, themeRegistry.getTheme(theme).getName());
    }
};

// init
settings._availableLanguages = [langKey2Description.get('none'), ...LANGUAGES.map(value => langKey2Description.get(value))]

const menuButtons: string[] | null = JSON.parse(localStorage.getItem(settings._menuButtonsKey))
if (menuButtons !== null && menuButtons.length === 3 && menuButtons.filter(value => langKey2Description.has(value)).length === 3) {
    // all is ok
} else {
    settings._setMenuButtons(defaultMenuButtons)
}