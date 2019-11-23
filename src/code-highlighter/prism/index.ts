import './code-highlighter';
import './prism-language-highlighter';
import {CodeHighlighterImpl} from "./code-highlighter";
import {PrismLanguageHighlighter} from "./prism-language-highlighter";
import {LANGUAGES} from "../config";
import {factories} from "./factories";
import {PrismDOMProcessor} from "./prism-dom-processor";

LANGUAGES.forEach(lang => {
    const tokenFactory = factories.get(lang);
    if (!tokenFactory){
        console.error(`Language isn't ${lang} implemented`);
    } else {
        CodeHighlighterImpl.getInstance().register(
            new PrismLanguageHighlighter(lang, new PrismDOMProcessor(tokenFactory))
        );
    }
});

export default CodeHighlighterImpl.getInstance();