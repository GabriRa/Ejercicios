var express = require("express");
var fs = require("fs");

var app = express();

app.get("/books", (req, res) => {
    fs.readFile(process.argv[3], (err, texto) => { //Lee un texto 
        if (err) return console.log(err);
        texto = JSON.parse(texto) //Cambiamos el formato
        res.json(texto); //le decimos el tipo de formato
    })
})

app.listen(process.argv[2]);