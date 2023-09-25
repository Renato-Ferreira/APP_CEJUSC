var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const { join } = require('path');

const iniciandoBD = require('../db/openDB');
const fechandoBD = require('../db/closeDB');


router.route('/agendar')
.all( async (req, res, next) => {
    let dataLog = new Date( Date.now() ).toString();
    console.log('(POST on "/agendar") Time:', dataLog, '\n');
    
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
                    let sql = `SELECT numero_reclamacao p FROM Agendamento WHERE numero_reclamacao = ?`;
                    // first row only
                    db.get(sql, [processo], (err, row) => {
                        if (err) {
                            return reject(console.error(err.message));
                        }
                        if (row){
                            msg = "Processo já cadastrado. Entre em ANDAMENTO para alterar informações.";
                            fechandoBD.setMsg = msg;
                            return resolve(db);
                        }
                        else{
                            db.run(`INSERT INTO Agendamento(numero_reclamacao, data, hora, sala) VALUES(?, ?, ?, ?)`, [processo, date, hora, sala], function(err) {
                                if (err) {
                                  return reject(console.error(err.message));
                                }
                                // get the last insert id
                                console.log(`A row has been inserted with rowid ${this.lastID}`);
                                msg = "Dados gravados com sucesso.";
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

module.exports = router;
