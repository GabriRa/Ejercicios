var http = require("http");
var url  = require("url");

var server = http.createServer( (req, res) => {
    let pathISO = "/api/parsetime";
    let pathUNIX = "/api/unixtime";
    req.on("data", data => {
        
    }).on("end", () => {
        let queryData = url.parse(req.url, true).query.iso.split("T");
        if(req.method == "GET" && req.url.indexOf(pathISO) != - 1){
            let tiempo = queryData[1].substr(0, queryData[1].length - 1).split(":");
            let objeto = {
                "hour" : parseInt(tiempo[0]),
                "minute" : parseInt(tiempo[1]),
                "second" : parseInt(tiempo[2])
            }
            res.writeHead(200, {"Content-Type" : "aplication/JSON"})
            res.end(JSON.stringify(objeto));
        } else if (req.method == "GET" && req.url.indexOf(pathUNIX) != -1){
            let fecha = queryData.join("T");
            fecha = new Date(fecha).getTime();
            fecha = {
                "unixtime" : fecha
            }
            res.end(JSON.stringify(fecha));
        }  
        res.end();
    })
})

server.listen(process.argv[2]);