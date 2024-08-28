const fs = require('fs');
const { join } = require('path');

const logger = require('./log/log');

const iniciandoBD = require('../db/openDB');
const fechandoBD = require('../db/closeDB');

const pautaRotas = (app) =>{

    app.route('/pauta/diaria')
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
        let linha = [];
        let linha1 = [];
        let linha2 = [];

		await pauta1();
		
        async function pauta1() {

            async function usandoBD(db) {
					
                let pautaTipo1 = new Promise( (resolve, reject) => {
                                        
                    db.serialize( () => {
                        let sql = `SELECT DISTINCT a.processo_id AS processo, a.assunto AS assunto, b.horario AS horario, b.sala AS sala
                                    FROM processos a, geral_processos b
                                    WHERE a.processo_id = b.processo_id AND b.data = '08/05/2024'
                                    ORDER BY b.horario, b.sala`;
                    
                        let sql2 = `SELECT DISTINCT a.processo_id AS processo, a.requerente AS requerente
                                    FROM requerentes a
                                    WHERE a.data = '08/05/2024'`;

                        let sql3 = `SELECT DISTINCT a.processo_id AS processo, a.requerido AS requerido
                                    FROM requeridos a
                                    WHERE a.data = '08/05/2024'`;                        

                        db.all(sql, [], (err, row) => {
                            if(err) {
                                return reject(logger(`MSG ERROR: ${err.message}`));
                            }
                            else {
                                linha = row;
                                logger("Consulta BD OK - rotapauta.js (sql)");
                            }
                        });
                        db.all(sql2, [], (err, row) => {
                            if(err) {
                                return reject(logger(`MSG ERROR: ${err.message}`));
                            }
                            else {                                            
                                linha1 = row;
                                logger("Consulta BD OK - rotapauta.js (sql1)");
                            }
                        });
                        db.all(sql3, [], (err, row) => {
                            if(err) {
                                return reject(logger(`MSG ERROR: ${err.message}`));
                            }
                            else {                                            
                                linha2 = row;
                                logger("Consulta BD OK - rotapauta.js (sql2)");
                                return resolve({ db, linha, linha1, linha2 });
                            }
                        });
                    });
                });    
                return pautaTipo1;                    
            }

            iniciandoBD()
            .then(usandoBD)                
            .then( (resultado) => {
                fechandoBD(resultado.db);
                //console.log("RESULTADO: ", resultado.linha);
                //console.log("TESTE: ", resultado.linha[2].assunto); //resultado.linha[2]["assunto"]
                res.send({ sucesso: true, linha: resultado.linha, linha1: resultado.linha1, linha2: resultado.linha2 });
                },
                (error) => {
                    //console.log(`DEU ZICA !!!! [ ${error} ]`);
                    logger(`MSG ERROR: Infelizmente deu zica !!! ${error}`);
                    res.send({ sucesso: false, erro: error.message });
                }
            );             
        }//fim do cunsultar1
    });//fim do post
}//
module.exports = pautaRotas;