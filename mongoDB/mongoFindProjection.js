var mongo = require("mongodb").MongoClient;

mongo.connect("mongodb://localhost:27017/learnyoumongo", (err, db) => {
   if (err) return console.log(err);
   
   db.collection("parrots")
            .find({ //find acepta dos argumentos, query y projection.
                age : {
                    $gt : parseInt(process.argv[2])
                }
            }, { //el projection nos permite seleccionar con true/false(1/0) los datos que queremos que se devuelvan
                name : 1,
                age : 1,
                _id : 0
            }).toArray( (err, documents) => {
                if (err) console.log(err);
                console.log(documents);
            })
   
   db.close(); 
});