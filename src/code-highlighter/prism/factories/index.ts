import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';

import { csharp } from './csharp'
import { gherkin } from './gherkin'
import { java } from './java'
import { javascript } from './javascript'

export const factories = new Map<String, TokenFactory>();
factories.set('csharp', csharp);
factories.set('gherkin', gherkin);
factories.set('java', java);
factories.set('js', javascript);
factories.set('json', javascript);
factories.set('ts', javascript);