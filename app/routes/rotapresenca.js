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
        };
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
                        if (err) {
                            return reject(console.error(err.message));
                        }
                        logger(`A row has been inserted with rowid ${this.lastID}`);
                        msg = true;
                        fechandoBD.setMsg = msg;
                        console.log(row.tema);
                        return resolve(db);                
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
module.exports = presencaRotas;
/*fechado 24/06/2020




const logger = require('./log/log');
const iniciandoBD = require('../db/openDB');
const fechandoBD = require('../db/closeDB');


function filipetaVirtual(processo){
    iniciandoBD(); // open the database
    let sql = `SELECT processos.assunto tema
                FROM procesos
                WHERE processos.processo_id = ?`;
    // first row only
    db.get(sql, [processo], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    return row
      ? console.log(row.tema)
      : console.log(`No assunto found with the id ${processo}`);
  
    });
    fechandoBD(); // close the database connection
};
module.exports = filipetaVirtual;*/