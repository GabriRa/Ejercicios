var funcion = require("./part2.js");
var fs = require("fs");
var path = require("path");

var filtro = function(err, datos){
    if (err){
        return console.log(err)
    }
    datos.forEach( archivo => {
        console.log(archivo)
    })
}

var a = funcion(process.argv[2], process.argv[3], filtro)