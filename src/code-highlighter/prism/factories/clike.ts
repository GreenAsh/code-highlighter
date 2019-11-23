import {DOM} from "../../config";

class ClikeTokenFactory implements TokenFactory {
    create(name: String, className: string): Node | false | null {
        switch (name) {
            case 'string':
            case 'boolean':
            case 'number':
            case 'function':
            case 'comment':
                const spanElement = DOM.createElement('span');
                spanElement.className = className;
                return spanElement;
            case 'keyword':
            case 'class-name':
                const bElement = DOM.createElement('b');
                bElement.className = className;
                return bElement;
            case 'operator':
            case 'punctuation':
                return false;
            default:
                return null;
        }
    }
}

export default new ClikeTokenFactory();