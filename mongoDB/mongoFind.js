var mongo = require("mongodb").MongoClient;

mongo.connect("mongodb://localhost:27017/learnyoumongo", (err, db) => { //Conexion a MongoDB, con un puerto y una base de datos
// nos hacemos cargo de err y de la base de datos
    if (err) return console.log(err);
    db.collection("parrots") //en la base de datos, entramos a la coleccion parrots
            .find({ //buscar, acepta un objeto como query
                age : {
                    $gt: parseInt(process.argv[2]) //solo aceptamos resultados donde age sea greater than argumento
                }
            }).toArray( (err, documents) =>{ //lo pasamos a una array, encargandonos del error y el resultado
                if (err) return console.log(err);
                console.log(documents); //hacemos un log del resultado;
            });
    db.close(); //cerramos la base de datos
})