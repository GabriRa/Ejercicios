var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:time", (req, res) => {
  //guardamos la query
  var time = req.params.time;
  
  //Comprabamos si esta en formato unix o en una string y lo pasamos a un objeto Date
  if(time.split(" ").length >= 2 ){
    time = new Date(time)
  } else {
    time = new Date(parseInt(time));
  }
  
  //Comprueba que se a un formato Correcto
  if (time == "Invalid Date"){
    return res.end("Invalid Date")
  } 
  
  //Pasamos el mes a formato correcto
  var tiempoArray = time.toString().split(" ");
  const meses = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var mes = meses[time.getMonth()];

  //Creamos el objeto que pasaremos
  var objeto = {
    natural : mes + " " + time.getDate() + ", " + time.getFullYear(),
    unix: time.getTime()
  }
  
  //Lo enviamos
  res.end(JSON.stringify(objeto)); 
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
