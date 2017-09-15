var mongo = require("mongodb").MongoClient;

mongo.connect(`mongodb://localhost:27017/${process.argv[2]}`, (err, db) => {
    if (err) throw err;
    db.collection(process.argv[3])
                .remove({
                    _id : process.argv[4]     
                }, (err) => {
                    if (err) throw err;
                });
    db.close();
})