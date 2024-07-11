const fs = require('fs');
const { join } = require('path');

const logger = require('./log/log');

const iniciandoBD = require('../db/openDB');
const fechandoBD = require('../db/closeDB');

const presencaRotas = (app) =>{

    app.route('/presenca/processo')
    .all( async (req, res, next) => {
        logger('POST', `${req.originalUrl}`);
        
        filePath = join(process.cwd(), '/login', `${req.body.cpfUsuario}.json`);
        let dados = fs.readFileSync(filePath);
        userLogado = JSON.parse(dados);

        async function confirmaUser(){
            if (req.body.tokenBD != userLogado.tokenDB){
                res.send("Usuário não autorizado");
            }
            else{
                next();
            }
        }
        await confirmaUser();
    })
    .post( async (req, res) => {
        await consultar1(req.body.processo);

        async function consultar1(processo) {

            function usandoBD(db) {
                return new Promise( (resolve, reject) => {
                    let sql = `SELECT processos.assunto tema
                                FROM processos
                                WHERE processos.processo_id = ?`;
                    // first row only
                    db.get(sql, [processo], (err, row) => {
                        if(err) {
                            return reject(console.error(err.message));
                        } else if(row) {
                            logger(`Uma linha foi encontrada. Processo: ${processo}`);                                                  
                            return resolve({ db, tema: row.tema });
                        } else {
                            logger(`Uma linha NÃO foi encontrada. Processo: ${processo}`);
                            return resolve({ db, tema: null });
                        }                                       
                    })                  
                });
            }

            iniciandoBD()
                .then(usandoBD)                
                .then( (resultado) => {
                    fechandoBD(resultado.db);                    
                    res.send({ sucesso: true, tema: resultado.tema });
                    },
                    (error) => {
                        console.log(`DEU ZICA !!!! [ ${error} ]`);
                        res.send({ sucesso: false, erro: error.message });
                    }
                );               

        }
    });

    
}
module.exports = presencaRotas;
//fechado parcialmente 11/07/2024