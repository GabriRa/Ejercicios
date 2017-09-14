var http = require("http");
var map = require("through2-map");

var server = http.createServer( (req, res) => {
    req.pipe(map( (chunk) => {
        return chunk.toString().toUpperCase();
    })).pipe(res);
});

server.listen(process.argv[2]);