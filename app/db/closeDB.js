// Módulo para fechamento do banco de dados
const logger = require('../routes/log/log');//new 19/06/2020

module.exports = function fechandoBD(db) {    

    return new Promise( (resolve, reject) => {
        db.close((err) => {
            if (err) {
                return reject(console.error(err.message));
            }            
            return resolve(logger('Banco de Dados CEJUSC fechado.'));
        });        
    });

};
