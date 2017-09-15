var mongo = require("mongodb").MongoClient;

mongo.connect(`mongodb://localhost:27017/learnyoumongo`, (err, db) => {
    if (err) throw err;
    db.collection("parrots")
                .count({
                    age : { $gt: parseInt(process.argv[2])}
                }, (err, cuenta) => {
                    if (err) throw err;
                    console.log(cuenta);
                })
    db.close();
})