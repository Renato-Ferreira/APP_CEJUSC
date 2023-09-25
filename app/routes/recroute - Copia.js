var express = require('express');
var router = express.Router();

const fs = require('fs');
const { join } = require('path');

const logger = require('./log/log');//new 19/06/2020

const iniciandoBD = require('../db/openDB');
const fechandoBD = require('../db/closeDB');

const reclamacaoRotas = () =>{

    router.route('/agendar')//rota para agendamento de reclamação no CEJUSC
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
        };
        await confirmaUser();
    })
    .post( async (req, res) => {
        await agendar(req.body.processo, req.body.date, req.body.hora, req.body.sala);

        async function agendar(processo, date, hora, sala) {

            function usandoBD(db) {
                return new Promise( (resolve, reject) => {
                    db.serialize( () => {
                        let insertAgendamento = new Promise( (resolve, reject) => {
                            let sql = `SELECT numero_reclamacao p FROM Agendamento WHERE numero_reclamacao = ?`;
                            //verifica se existe o processo já cadastrado
                            db.get(sql, [processo], (err, row) => {
                                if (err) {
                                    return reject(console.error(err.message));
                                }
                                return resolve(row);
                            });
                        });
                    
                        insertAgendamento.then( (row) => {
                            if (row){
                                msg = false;
                                fechandoBD.setMsg = msg;
                                return resolve(db);
                            }
                            else{
                                db.run(`INSERT INTO Agendamento(numero_reclamacao, data, hora, sala) VALUES(?, ?, ?, ?)`, [processo, date, hora, sala], function(err) {
                                    if (err) {
                                        return reject(console.error(err.message));
                                    }
                                    // get the last insert id
                                    logger(`A row has been inserted with rowid ${this.lastID}`);
                                    msg = true;
                                    fechandoBD.setMsg = msg;
                                    return resolve(db);
                                });
                            };
                        });
                    });
                });
            };

            iniciandoBD()
                .then(usandoBD)
                .then(fechandoBD)
                .then( (resultado) => {
                        res.send(resultado);
                    },
                    (error) => {
                        console.log(`DEU ZICA !!!! [ ${error} ]`);
                    }
                );

        }
    });

}
module.exports = reclamacaoRotas;