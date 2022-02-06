import {DOM} from "../../config";
import {CLikeTokenFactory} from './clike'

class JavascriptTokenFactory extends CLikeTokenFactory {

    create(name: String, className: string): Node | false | null {
        const result = super.create(name, className);
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
            case 'constant':
                return DOM.createElement('span', className);
            default:
                return null;
        }
    }
}

export const javascript = new JavascriptTokenFactory();