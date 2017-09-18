var express = require('express');
var path = require("path");
var mongo = require("mongodb").MongoClient;
var shortid = require("shortid");

var uriDB = process.env.MONGOLAB_URI; //Variable no accesible para conexion con BD
var urlRegEx = /^(http(s)?:\/\/(www\.)?|www\.)/; //RegEx para encontrar urls

var app = express();


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public')); //Enviamos la carpeta /public y la hacemos publica


app.get('/', (req, res) => { 
	res.sendFile(path.resolve(__dirname, "public", "principal.html")); //Enviamos un documento HTML de la carpeta publica
});


app.get("/api/url/:url", (req, res) => {
	let urlAcortar = req.params.url; //Pasamos el parametro a una variable manejable

	//Comprobamos que sea una url para continuar
	if(urlRegEx.test(urlAcortar)) { 
		let urlFormateada = urlAcortar.replace(urlRegEx, "https://"); //Formatemos la url

		//Conectamos con la base de datos
		mongo.connect(uriDB, (err, db) => {
			if (err) return console.log(err); //Handle error

			//Conexion con la coleccion
			db.collection("urlAcortadas", (err, collection) => {
				
				//Buscamos la url que nos pasan como parametro
				collection.findOne({
					url: urlFormateada			 			//Query a buscar
				}, { _id: 0, url: 0 }, 						//Datos innecesarios
				(err, resultado) => { 
					if (err) return console.log(err); 		//Handle error

					if (resultado !== null){ 				// comprobamos si ya forma parte de la base de datos
						db.close();
						res.end(`Esta url ya esta acortada, dirijase a minimi-url.heroku.com/url/${resultado.urlID}`); 
					} else { 								// Si no forma parte, creamos un nuevo documento en la BD
						collection.insert({
							url : urlFormateada, 			//Url ya formateada
							urlID : shortid.generate()		//Id unica y accesible para la url
						}, (err, data) => { 
							if (err) return console.log(err) 
							res.end(`La url a sido almacenada y guardada. Accede a traves de minimi-url.com/url/${data.ops.urlID}`);
						}); // Final del insert
						db.close();
					}
				})//Final de findOne

			}) // Fin conexion con coleccion

		}); //Fin de la conexion
	}
});


app.get("/url/:urlID", (req, res) => {
	let urlID = req.params.urlID;

	mongo.connect(uriDB, (err, db) => {
		if (err) return console.log(err);
		db.collection("urlAcortadas")
			.findOne({ urlID: urlID }, { _id:0, urlID:0}, //Buscamos la url que nos pasan como parametro
			(err, resultado) => {
				if (err) return console.log(err);
				res.redirect(resultado.url); //redirigimos al usuario a la pagina deseada
			})
		db.close();
	});
})


app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

