import {DOM} from "../../config";

class JavaTokenFactory implements TokenFactory {
    create(name: String, className: string): Node | false | null {
        switch (name) {
            case 'string':
            case 'boolean':
            case 'number':
            case 'function':
            case 'namespace':
            case 'generics':
            case 'comment':
                return DOM.createElement('span');
            case 'keyword':
            case 'class-name':
            case 'annotation':
                return DOM.createElement('b');
            case 'operator':
            case 'punctuation':
                return false;
            default:
                return null;
        }
    }
}

export default new JavaTokenFactory();