import mainData from '../../resources/icons/main.svg'
import csharp from '../../resources/icons/csharp.svg'
import javaData from '../../resources/icons/java.svg'
import jsData from '../../resources/icons/js.svg'
import jsonData from '../../resources/icons/json.svg'
import tsData from '../../resources/icons/ts.svg'
import cucumberData from '../../resources/icons/cucumber.svg'

export const mainIcon = mainData;
export const langKey2IconData: Map<string, string> = new Map([
    ['csharp', csharp],
    ['gherkin', cucumberData],
    ['java', javaData],
    ['js', jsData],
    ['json', jsonData],
    ['ts', tsData]
]);

