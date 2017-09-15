var express = require("express");

var app = express();

app.put("/message/:id", (req, res) => {
    res.end(require("crypto")
                        .createHash("sha1")
                        .update(new Date().toDateString() + req.params.id) //Accedemos a la variable de la ruta (id)
                        .digest("hex"));
})

app.listen(process.argv[2]);