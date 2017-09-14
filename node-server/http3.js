var http = require("http");

http.get(process.argv[2], res => {
    let respuesta = "";
    res.on("data", data => {
        respuesta += data
    })
    res.on("end", () =>{
        console.log(respuesta);
        http.get(process.argv[3], res=>{
            res.setEncoding("utf8")
            respuesta = "";
            res.on("data", data => {
                respuesta += data;
            })
            res.on("end", () => {
                console.log(respuesta);
                http.get(process.argv[4], res =>{
                    respuesta = "";
                    res.on("data", data => {
                        respuesta += data;
                    })
                    res.on("end", () => {
                        console.log(respuesta);
                    })
                })
            })
        })
    })
}).on("error", err => console.log(err))