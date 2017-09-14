var fs = require("fs");

var texto = fs.readFileSync(process.argv[2]).toString();

console.log(texto.split('\n').length-1);