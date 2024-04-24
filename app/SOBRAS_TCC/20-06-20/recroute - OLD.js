var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const { join } = require('path');


router.route('/agendar')
.all( async (req, res, next) => {
    let dataLog = new Date( Date.now() ).toString();
    console.log('(POST on "/agendar") Time:', dataLog, '\n');
    console.log(req.body.tokenBD, req.body.cpfUsuario, req.body.processo, req.body.date, req.body.sala, req.body.hora);
    
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
    await agendar(req.body.processo);

    async function agendar(processo) {
        var msg = ""; 

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
                    let sql = `SELECT numero_reclamacao p FROM Agendamento WHERE numero_reclamacao = ?`;
                    // first row only
                    db.get(sql, [processo], (err, row) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        if (row){
                            msg = "Processo já cadastrado. Entre em ANDAMENTO para alterar informações.";
                        }
                        else{
                            msg = "Dados gravados com sucesso.";
                        };
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
                    console.log('Banco de Dados CEJUSC fechado.\n');
                    return resolve(msg);
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

module.exports = router;
