var mongo = require("mongodb").MongoClient;

mongo.connect("mongodb://localhost:27017/learnyoumongo", (err, db) => {
    if (err) return console.log(err);
    
    let objet = {
        firstName : process.argv[2],
        lastName : process.argv[3]
    }
    
    db.collection("docs")
            .insert( objet , (err, data) => {
                if (err) console.log(err);
                console.log(JSON.stringify(objet));
            });
    db.close();
})