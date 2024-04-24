// Módulo para abertura do banco de dados
const sqlite3 = require('sqlite3').verbose();
const logger = require('../routes/log/log');//new 19/06/2020

module.exports = function iniciandoBD() {
    return new Promise( (resolve, reject) => {
        let db = new sqlite3.Database('./db/CEJUSC.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return reject(console.error(err.message));
            }
            //console.log('Conectado ao Banco de Dados CEJUSC.');
            logger('Conectado ao Banco de Dados CEJUSC.');
        });
        return resolve(db);
    });
};
