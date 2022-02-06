import 'prismjs/components/prism-gherkin';
import {DOM} from '../../config';
import {CLikeTokenFactory} from './clike'

class GherkinTokenFactory extends CLikeTokenFactory {
    create(name: String, className: string): Node | false | null {
        switch (name) {
            case 'scenario':
            case 'keyword':
            case 'atrule':
            case 'feature':
                return DOM.createElement('span', className);
            case 'important':
                return DOM.createElement('b', className);
            case 'outline':
            case 'th':
                return DOM.createElement('i', className);
            default:
                return super.create(name, className);
        }
    }
}

export const gherkin = new GherkinTokenFactory();