const express = require("express");
const http = require("http");
const path = require("path");
const request = require("request");

const app = express();

// Envia el build haciendo lo publico
app.use(express.static(path.resolve(__dirname, "..", "build")));

//A cualquier llamada, devolver el index.html
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});


app.listen(4000, () => {
    console.log("Hola desde puerto 4000");
})