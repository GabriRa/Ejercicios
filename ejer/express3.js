var express = require("express");

var app = express();

app.get("/home", (req, res) => {
    app.set("view engine", "jade");
    app.set("views", process.argv[3]);
    app.render("index", {date:new Date().toDateString()})
})

app.listen(process.argv[2])