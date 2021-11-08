import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';

import { default as clike } from './clike'
import { default as java } from './java'
import { default as javascript } from './javascript'

export const factories = new Map<String, TokenFactory>();
factories.set('clike', clike);
factories.set('java', java);
factories.set('js', javascript);
factories.set('ts', javascript);