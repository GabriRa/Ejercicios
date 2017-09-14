var express = require("express");

var app = express(); //Crea  una app

app.get("/home", (req, res) => { //Espera una llamada del tipo GET en la ruta /home
    res.end("Hello World!") //Envia una string al acabar la respuesta
})

app.listen(process.argv[2]) //Escucha un puerto dado por la linea de comandos