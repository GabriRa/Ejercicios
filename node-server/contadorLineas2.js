var fs = require("fs");

var texto = fs.readFile(process.argv[2], (err, data) => {
    if (err){
        return console.log(err);
    }
    data = data.toString().split("\n").length;
    console.log(data - 1 );
})