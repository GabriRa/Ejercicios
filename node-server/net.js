var net = require("net");

var server = net.createServer( socket => {
    var a = new Date();
    let fecha = a.getFullYear() + "-0" + (a.getMonth() + 1) + "-1" + a.getDay() + " " + a.getHours() + ":" + a.getMinutes(); 
    socket.write(fecha)
    socket.end("\n");
})

server.listen(process.argv[2]);