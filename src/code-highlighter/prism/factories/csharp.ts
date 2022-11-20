import 'prismjs/components/prism-csharp';
import {CLikeTokenFactory} from './clike'
import {DOM} from "../../config";

class CSharpTokenFactory extends CLikeTokenFactory {
    create(name: String, className: string): Node | false | null {
        const result = super.create(name, className);
        if (result !== null) {
            return result;
        }
        switch (name) {
            case 'namespace':
            case 'generics':
            case 'annotation':
            case 'constructor-invocation':
            case 'return-type':
                return DOM.createElement('span', className);
            default:
                return null;
        }
    }
}

export const csharp = new CSharpTokenFactory();