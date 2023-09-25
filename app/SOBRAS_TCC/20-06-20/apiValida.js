//Módulo de validação do LOGIN-SENHA
const sqlite3 = require('sqlite3').verbose();

module.exports = async function validaUser(user, senha) {
    var msg = false; 

    function iniciandoBD() {
        return new Promise( (resolve, reject) => {
            let db = new sqlite3.Database('./db/CEJUSC.db', sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    return reject(console.error(err.message));
                }
                console.log('Conectado ao Banco de Dados CEJUSC.');
            });
            return resolve(db);
        });
    };

    function usandoBD(db) {
        return new Promise( (resolve, reject) => {
            db.serialize( () => {
                let sql = `SELECT userName nome, userCPF cpf, password pswd FROM Usuarios`;
                db.each(sql, (err, row) => {
                    if (err) {
                        return reject(console.error(err.message));
                    }
                    else{
                        console.log(msg);
                        console.log(user, senha);
                        console.log(row.cpf, row.pswd);
                        if (user == row.cpf && senha == row.pswd) {
                            console.log(row.nome);
                            msg = true;
                        }
                    }
                });
            });
            return resolve(db);
        });
    };

    function fechandoBD(db) {
        return new Promise( (resolve, reject) => {
            db.close((err) => {
                if (err) {
                    return reject(console.error(err.message));
                }
                console.log('Banco de Dados CEJUSC fechado.');
                return resolve(msg);
            });
            // return resolve() >>> como preciso do retorno do booleano 'msg' o return sobe para o escopo anterior
        });
    };

    iniciandoBD()
        .then(usandoBD)
        .then(fechandoBD)
        .then( (resultado) => {
                console.log(resultado + " dentro do BD");
                return(resultado);
            },
            (error) => {
                console.log(`DEU ZICA !!!! [ ${error} ]`);
            }
        );

}
//Isto funciona muito bem, porém tive que mudar parte do código para o ROUTER do app (19/05/2020)