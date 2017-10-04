require("dotenv").config();
const express = require("express");
const path = require("path");
const request = require("request");

const app = express();

//Cogemos la api key de una variable oculta o de un parametro dado
const api_key = process.env.TMDB_KEY || process.argv[2];
const url_api = "https://api.themoviedb.org/3";
const imdb_api = "http://www.theimdbapi.org/api/movie?movie_id=";

//Query especial para sacar estrenos
const query_estrenos = `${url_api}/discover/movie?api_key=${api_key}&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=true&page=1&primary_release_date.lte=2017-9-10&vote_count.gte=100`;


app.get("/api", (req, res) => {

    //Lamada especial para estrenos
    if(req.query.estrenos == "estrenos"){
        request(query_estrenos, (err, response, body) => {
            if (err) throw err;
            res.end(body);
        })
    } 
    //Todas las demas llamadas pasan a ser formateadas
    else {

        let busqueda = req.query; // creamos un objeto para almacenar la query

        //Formatemos la url que usaremos
        let urlBusqueda = `${url_api}/${busqueda.categoria1}/${busqueda.categoria2}?api_key=${api_key}`
        // Añadimos alguna opcion en caso de haber
        if(busqueda.opcion1){
            urlBusqueda += `&language=en-US&sort_by=${busqueda.opcion1}`;
        }

        // Hacemos la llamada a la api
        request(urlBusqueda, (err, response, body) => {
            if (err) throw err;
            if (res.statusCode == 200){
                res.end(body);
            }
        })

    }
})

app.get("/pelicula/id/:id", (req, res) => {
    let data = {};

    let idPelicula = req.params.id;
    
    let urlBusqueda = `${url_api}/movie/${idPelicula}?api_key=${api_key}`

    request(urlBusqueda, (err, response, body) => {
        if (err) throw err;
        data.tmbdAPI = JSON.parse(body);
        //Pasamos los datos necesarios a nuestra funcion
        recogerMasDatos(JSON.parse(body).imdb_id);
    })


    //Recoge mas datos una vez se ha completado la primera llamada. Esto permite coger datos de la primera llamada y usarlos
    //Para hacer la segunda
    function recogerMasDatos(id){
        request(imdb_api + id, (err, response, body) => {
            if (err) throw err;
            data.imdbAPI = JSON.parse(body);
            res.end(JSON.stringify(data));
        })
    }


});

app.get("/buscar/:busqueda", (req, res) => {
    let busqueda = req.params.busqueda;

    let urlBusqueda = `${url_api}/search/movie?api_key=${api_key}&language=en-US&query=${busqueda}&page=1&include_adult=false`

    request(urlBusqueda, (err, response, body) => {
        if (err) throw err;
        console.log(urlBusqueda, "buscar");
        res.end(body);
    })
})

// Envia el build haciendo lo publico
app.use(express.static(path.resolve(__dirname, "..", "build")));

//A cualquier llamada, devolver el index.html
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});



// app.get("/api", (req, res) => {
//     let id = req.query;
//     res.end(JSON.stringify(id))
// })

app.listen(process.env.PORT || 5000 , () => {
    console.log("Arreando");
})
