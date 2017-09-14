var express = require("express");

var app = express();

app.get("/search", (req, res) => {
    var objetoFinal = req.query //Como obtener la query (/search?query)
    res.send(objetoFinal);
})

app.listen(process.argv[2]);