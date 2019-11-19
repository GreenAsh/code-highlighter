const PRISM = require('../prism.js');

const test_code = `PATCH https://api.miro.com/v1/boards/o9J_kxV67-0=/widgets/3074457346877939005
Authorization: Bearer a6b6ed24-0b1d-49cb-91a4-d49d3384dcae
Content-Type: application/json

{
  "rotation": 111234123123111.123
}`;

console.log(Prism.highlight(test_code, Prism.languages.http, 'http'));