var fs = require("fs");
fs.readdir(process.argv[2], (err, list) => {
    if (err){
        console.log(err);
        return;
    }
    var listaFiltrada = list.filter( archivo => {
        return archivo.indexOf("."+process.argv[3]) != -1
    })
    for(var i = 0; i<listaFiltrada.length; i++){
        console.log(listaFiltrada[i]);
    }
})