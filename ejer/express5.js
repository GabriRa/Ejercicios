var express = require("express");
var stylus = require("stylus");

var app = express();

app.use(express.static(process.argv[3])); //Envia un archivo
app.use(stylus.middleware(process.argv[3], "main.css")); //Envia un estilo a un archivo

app.listen(process.argv[2]);