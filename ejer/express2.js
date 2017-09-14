var express = require("express");
var path = require("path");

var app = express();

app.use(express.static(process.argv[3] || path.join(__dirname, "public")));
//Usa una ruta para enviar un documento de forma estatica

app.listen(process.argv[2]);