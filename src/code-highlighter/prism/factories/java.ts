import 'prismjs/components/prism-java';
import {DOM} from "../../config";
import {CLikeTokenFactory} from "./clike";

class JavaTokenFactory extends CLikeTokenFactory {
    create(name: String, className: string): Node | false | null {
        let result = super.create(name, className);
        if (result !== null) {
            return result;
        }
        switch (name) {
            case 'namespace':
            case 'generics':
            case 'annotation':
                return DOM.createElement('span', className);
            default:
                return null;
        }
    }
}

export default new JavaTokenFactory();