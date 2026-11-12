const fs = require('fs');

function gravarPostos(caminho, postos) {
    fs.writeFile(caminho, JSON.stringify(postos, null, 4), (err) => {
        if (err != null) {
            return console.log(err);
        }
        console.log("Postos gravados com sucesso.");
    });
}

function lerPostos(caminho) {
    return new Promise(function (resolve, reject) {
        fs.readFile(caminho, 'utf8', function (err, data) {
            if (err) return reject(err);
            if (data === "" || data == null) return resolve([]);
            try {
                resolve(JSON.parse(data));
            } catch (error) { 
                reject(error); 
            }
        });
    });
}

module.exports = { gravarPostos, lerPostos };