import 'prismjs/components/prism-clike';
import {DOM} from "../../config";

export class CLikeTokenFactory implements TokenFactory {
    create(name: String, className: string): Node | false | null {
        switch (name) {
            case 'string':
            case 'boolean':
            case 'number':
            case 'function':
            case 'comment':
            case 'keyword':
            case 'class-name':
                return DOM.createElement('span', className);
            case 'operator':
            case 'punctuation':
                return false;
            default:
                return null;
        }
    }
}

export default new CLikeTokenFactory();