var express = require('express');
var path = require("path");
var mongo = require("mongodb").MongoClient;
var shortid = require("shortid");

var uriDB = process.env.MONGOLAB_URI;
var urlRegEx = /^(http(s)?:\/\/(www\.)?|www\.)/;
var app = express();


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, "public", "principal.html"));
});


app.get("/api/url/:url", (req, res) => {
	let urlAcortar = req.params.url; //Pasamos el parametro a una variable

	//Comprobamos que sea una url
	if(urlRegEx.test(urlAcortar)) { 
		let urlFormateada = urlAcortar.replace(urlRegEx, "https://"); //Formatemos la url

		//Conectamos con la base de datos
		mongo.connect(uriDB, (err, db) => {
			if (err) return console.log(err); //Handle error

			//Conexion con la coleccion
			db.collection("urlAcortadas").findOne({
				url: urlFormateada			 			//Query a buscar
			},{ _id: 0, url: 0} 						//Datos innecesarios
			, (err, documents) => { 
				if (err) return console.log(err); 		//Handle error

				if (documents !== null){ 				// comprobamos si ya forma parte de la base de datos
					res.end(JSON.stringify(documents)); 
				} else { 								//hacemos algo si no forma parte
					db.collection("urlAcortadas").insert({
						url : urlFormateada, 			//Url ya formateada
						urlID : shortid.generate()
					}, (err, data) => { if (err) return console.log(err) });
					res.end("Hola caracola");
				}
			})

				// if (collection.find({url:urlFormateada}).count() === 0) { //si es una nueva url, la añadimos a la base de datos
				// 	console.log("3")
				// 	collection.insert({
				// 			url : urlFormateada, //Url ya formateada
				// 			urlID : nuevaUrlID //Una id, que se crea a partir de las existentes
				// 		}, (err, data) => {
				// 			if (err) return console.log(err);
				// 	})
				// };

			db.close()
		});
	}
});


app.get("/url/:urlID", (req, res) => {
	let urlID = req.params.urlID;

	mongo.connect(uriDB, (err, db) => {
		if (err) return console.log(err);
		db.collection("urlAcortadas")
				.find({
					urlID: urlID
				}, { _id:0, urlID:0})
				.toArray( (err, resultado) => {
					if (err) return console.log(err);
					res.res(JSON.stringify(resultado));
				})
		db.close();
	});
})


app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

