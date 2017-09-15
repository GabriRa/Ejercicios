var mongo = require("mongodb").MongoClient;

mongo.connect(`mongodb://localhost:27017/${process.argv[2]}`, (err, db) => {
    if (err) throw err;
    db.collection("users")
            .update({ //toma dos argumentos, una query (que debe ser unica), y un reemplazo, el cual debe de llevar 
                username: "tinatime"                // un operador o se sustituye totalmente
            },{
                $set : {
                    age : 40
                }
            }, (err, data) => {
                if (err) throw err;
            });
    db.close();
})