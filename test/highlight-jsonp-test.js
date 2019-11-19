const PRISM = require('../prism.js');
const { highlightCode } = require('../code-highlighter.js');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(``);
const document = dom.window.document;

console.log(highlightCode(`{
  "type": "object",
  "properties": {
    "x": {
      "$ref": "api:/#/definitions/numberData"
    },
    "y": {
      "$ref": "api:/#/definitions/numberData"
    },
    "width": {
      "type": "number",
      "minimum": 8,
      "maximum": 1E15
    },
    "rotation": {
      "$ref": "api:/#/definitions/rotationData"
    },
    "text": {
      "type": "string",
      "minLength": 1,
      "maxLength": 6000
    },
    "groupId": {
      "type": "integer"
    },
    "style": {
      "type": [
        "object",
        "null"
      ],
      "properties": {
        "backgroundColor": {
          "$ref": "api:/#/definitions/colorData"
        },
        "backgroundOpacity": {
          "$ref": "api:/#/definitions/opacityEnum"
        },
        "fontFamily": {
          "$ref": "api:/#/definitions/fontFamilyEnum"
        },
        "fontSize": {
          "$ref": "api:/#/definitions/fontSizeData"
        },
        "borderColor": {
          "$ref": "api:/#/definitions/colorData"
        },
        "borderOpacity": {
          "$ref": "api:/#/definitions/opacityEnum"
        },
        "borderWidth": {
          "$ref": "api:/#/definitions/borderWidthEnum"
        },
        "borderStyle": {
          "$ref": "api:/#/definitions/borderStyleEnum"
        },
        "textColor": {
          "$ref": "api:/#/definitions/colorData"
        },
        "textAlign": {
          "$ref": "api:/#/definitions/textAlignEnum"
        }
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false
}`, document, 'jsonp'));

