var express = require("express");
var bodyparser = require("body-parser")

var app = express();

app.use(bodyparser.urlencoded({extended:false})) //No se que hace exactamente
//Pasa los datos de la req a una forma mas manejable

app.post("/form", (req, res) => {
    res.end(req.body.str.split("").reverse().join("")); //Devuelve la string de la llamada al reves
})

app.listen(process.argv[2]);