var fs = require("fs");
var path = require("path");

module.exports = function (dirName, fileExtension, callback){
    fs.readdir(dirName, (err, list) => {
        if (err){
            return callback(err);
        }
        
        let data = list.filter(archivo => {
            return path.extname(archivo) == "."+fileExtension;
        })
        
        callback(null, data);
        
    });
}