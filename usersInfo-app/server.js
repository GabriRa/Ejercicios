var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", (req, res) =>{
  //req.headers
  let resultado = {
    ipAdress : req.headers["x-forwarded-for"].split(",")[0],
    language : req.headers["accept-language"].split(",")[0],
    software: req.headers["user-agent"]
  };
  res.end(JSON.stringify(resultado))
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
