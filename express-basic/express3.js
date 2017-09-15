var express = require("express");

var app = express();

app.get("/home", (req, res) => {
    app.set("view engine", "jade"); //Selecciona el view engine
    app.set("views", process.argv[3]); //Define la ruta de las views
    app.render("index", {date:new Date().toDateString()}) //Al hacer render, envia los datos a index
})

app.listen(process.argv[2])