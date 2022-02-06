import 'prismjs/components/prism-typescript';

import { java } from './java'
import { javascript } from './javascript'
import { gherkin } from './gherkin'

export const factories = new Map<String, TokenFactory>();
factories.set('java', java);
factories.set('js', javascript);
factories.set('ts', javascript);
factories.set('gherkin', gherkin);