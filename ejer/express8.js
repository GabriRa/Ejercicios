var express = require("express");
var fs = require("fs");

var app = express();

app.get("/books", (req, res) => {
    fs.readFile(process.argv[3], (err, texto) => {
        if (err) return console.log(err);
        texto = JSON.parse(texto)
        res.json(texto);
    })
})

app.listen(process.argv[2]);