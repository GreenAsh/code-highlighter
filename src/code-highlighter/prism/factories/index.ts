import { default as clike } from './clike'
import { default as java } from './java'

export let factories = new Map<String, TokenFactory>();
factories.set('clike', clike);
factories.set('java', java);