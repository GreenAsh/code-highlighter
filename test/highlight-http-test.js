const PRISM = require('../prism.js');
const { highlightCode } = require('../code-highlighter.js');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(``);
const document = dom.window.document;

console.log(highlightCode(`POST http://dev.local:9114/v1/boards/o9J_k1JMzCM=/widgets
Content-Type: application/json
Authorization: Bearer 60ed1706-b6c7-4f5b-97a6-ba1d53e0b0ba

{
  "type": "shape",
  "text": "some text",
  "rotation": 10000.0
}`, document, 'http'));

