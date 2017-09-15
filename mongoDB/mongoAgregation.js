var mongo = require("mongodb").MongoClient;

mongo.connect(`mongodb://localhost:27017/learnyoumongo`, (err, db) => {
    if (err) throw err;
    db.collection("prices")
                .aggregate([ //Toma una array como argumento, el cual contiene pipelines (las cuales nos permiten jugar)
                    { $match : {size : process.argv[2] } }, //Encuentra cualquier documento donde el size sea igual 
                    { $group : { //nos permite hacer operaciones creando un nuevo documento
                            _id : "average", //creamos una id unica
                            total : {        //creamos una seccion para el resultado
                                $avg : "$price" //podemos user miltiples operadores especificos de $group, y usar un valor de
                            }                   //los documentos que hayan coincidido, como $price
                        }
                    }
                ]).toArray( (err, results) =>{ //El resultado es el documento que hemos escrito en $group
                    if (err) throw err;
                    console.log(Number(results[0].total).toFixed(2));
                })
    db.close();
})