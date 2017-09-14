var http = require("http");

http.get(process.argv[2], res => {
    let final = "";
    res.on("data", chunk => {
        final += chunk
    })
    res.on("end", end => {
        console.log(final.length)
        console.log(final);
    })
    res.on("error", err =>{
        return console.log(err);
    })
}).on("error", err => console.log(err))