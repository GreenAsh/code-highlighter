import mainData from '../../resources/icons/main.svg'
import javaData from '../../resources/icons/java.svg'
import jsData from '../../resources/icons/js.svg'
import tsData from '../../resources/icons/ts.svg'
import cucumberData from '../../resources/icons/cucumber.svg'
import {LanguageDescription} from "../settings/shared-settings";

export const mainIcon = mainData;
export const langKey2IconData: Map<string, string> = new Map([
    ['java', javaData],
    ['js', jsData],
    ['ts', tsData],
    ['gherkin', cucumberData]
]);

