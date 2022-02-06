import 'prismjs/components/prism-clike';
import {DOM} from '../../config';

export class CLikeTokenFactory implements TokenFactory {
    create(name: String, className: string): Node | false | null {
        switch (name) {
            case 'keyword':
            case 'string':
            case 'boolean':
            case 'number':
            case 'function':
            case 'comment':
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