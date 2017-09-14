var express = require("express");
var stylus = require("stylus");

var app = express();

app.use(express.static(process.argv[3]))
app.use(stylus.middleware(process.argv[3], "main.css"));

app.listen(process.argv[2]);