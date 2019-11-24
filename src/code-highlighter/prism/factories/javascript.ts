import 'prismjs/components/prism-clike';
import {DOM} from "../../config";
import {CLikeTokenFactory} from './clike'

class JavascriptTokenFactory extends CLikeTokenFactory {

    create(name: String, className: string): Node | false | null {
        let result = super.create(name, className);
        if (result !== null) {
            return result;
        }
        switch (name) {
            case 'regex':
            case 'function-variable':
            case 'parameter':
            case 'template-string':
            case 'template-punctuation':
            case 'interpolation':
            case 'interpolation-punctuation':
                return DOM.createElement('span', className);
            case 'constant':
                return DOM.createElement('b', className);
            default:
                return null;
        }
    }
}

export default new JavascriptTokenFactory();