// Módulo para fechamento do banco de dados
const logger = require('../routes/log/log');//new 19/06/2020

module.exports = function fechandoBD(db) {

    setMsg: (msg) => { this.msg = msg; };

    return new Promise( (resolve, reject) => {
        db.close((err) => {
            if (err) {
                return reject(console.error(err.message));
            }
            logger('Banco de Dados CEJUSC fechado.');
            return resolve(this.msg);
        });
        //return resolve(this.msg); >>> como preciso do retorno do booleano 'msg' o return sobe para o escopo anterior
    });
};
