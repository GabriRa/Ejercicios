var express = require("express");

var app = express();

app.get("/search", (req, res) => {
    var objetoFinal = req.query
    res.send(objetoFinal);
})

app.listen(process.argv[2]);