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
        filipeta = {
					processo: req.body.processo,
					assunto: "",
					data: "",
					horario: "",
					sala: "",
					situacao: "",
					requerente: [],
					adv_requerente: [],
					requerido: [],
					adv_requerido: [],
					preenchida: ""
				}
		await consultar1(filipeta);
		
        async function consultar1(filipeta) {

            async function usandoBD(db) {
					
                let consultaTipo1 = new Promise( (resolve, reject) => {
                    let sql = `SELECT a.processo_id
                                FROM processos a
                                WHERE a.processo_id = ?`;
                    //verifica se existe o processo já cadastrado// first row only
                    db.get(sql, [filipeta.processo], (err, row) => {
                        if (err) {
                            return reject(console.error(err.message));
                        } 
                        else if (!row){
                            logger(`Uma linha NÃO foi encontrada. Processo: ${filipeta.processo}`);
                            filipeta.preenchida = false;
                            return resolve({ db, filipeta });
                        }
                        else{
                            db.serialize( () => {
                                let sql = `SELECT a.assunto AS assunto, b.data AS data, b.horario AS horario, b.sala AS sala, b.situacao AS situacao
                                            FROM processos a, geral_processos b
                                            WHERE a.processo_id = ? AND a.processo_id = b.processo_id`;
                            
                                let sql2 = `SELECT DISTINCT a.requerente AS requerente
                                            FROM requerentes a
                                            WHERE a.processo_id = ?`;

                                let sql3 = `SELECT DISTINCT a.advogado AS advogado_rqrnt
                                            FROM requerente_advs a
                                            WHERE a.processo_id = ?`;

                                let sql4 = `SELECT DISTINCT a.requerido AS requerido
                                            FROM requeridos a
                                            WHERE a.processo_id = ?`;

                                let sql5 = `SELECT DISTINCT a.advogado AS advogado_rqrd
                                            FROM requerido_advs a
                                            WHERE a.processo_id = ?`;

                                db.each(sql2, [filipeta.processo], (err, row) => {
                                    if(err) {
                                        return reject(console.error(err.message));
                                    }
                                    else {                                            
                                        filipeta.requerente.push(row.requerente);
                                    }
                                });
                                db.each(sql3, [filipeta.processo], (err, row) => {
                                    if(err) {
                                        return reject(console.error(err.message));
                                    }
                                    else {                                            
                                        filipeta.adv_requerente.push(row.advogado_rqrnt);
                                    }
                                });
                                db.each(sql4, [filipeta.processo], (err, row) => {
                                    if(err) {
                                        return reject(console.error(err.message));
                                    }
                                    else {                                            
                                        filipeta.requerido.push(row.requerido);
                                    }
                                });
                                db.each(sql5, [filipeta.processo], (err, row) => {
                                    if(err) {
                                        return reject(console.error(err.message));
                                    }
                                    else {                                            
                                        filipeta.adv_requerido.push(row.advogado_rqrd);
                                    }                                        
                                });
                                db.get(sql, [filipeta.processo], (err, row) => {
                                    if(err) {
                                        return reject(console.error(err.message));
                                    }
                                    else {                                            
                                        filipeta.assunto = row.assunto;
                                        filipeta.data = row.data;
                                        filipeta.horario = row.horario;
                                        filipeta.sala = row.sala;
                                        filipeta.situacao = row.situacao;
                                        logger(`Uma linha FOI encontrada. Processo: ${filipeta.processo}`);
                                        filipeta.preenchida = true;                                            
                                        return resolve({ db, filipeta });
                                    }
                                });
                            
                            });                         
                        }
                    });
                });            
                return consultaTipo1;                    
            }

            iniciandoBD()
            .then(usandoBD)                
            .then( (resultado) => {
                //console.log("Filipeta resultado:", resultado.filipeta); // Adicione este log
                fechandoBD(resultado.db);                    
                res.send({ sucesso: true, filipeta: resultado.filipeta });
                },
                (error) => {
                    console.log(`DEU ZICA !!!! [ ${error} ]`);
                    res.send({ sucesso: false, erro: error.message });
                }
            );             
        }
    });
    
    app.route('/presenca/nome')
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
        
		await consultar2();
		
        async function consultar2() {

            async function usandoBD(db) {
					
                let consultaTipo2 = new Promise( (resolve, reject) => {
                    let sql = `SELECT DISTINCT gp.processo_id AS numProcesso
								  FROM geral_processos gp
									   LEFT JOIN
									   requerentes r ON gp.processo_id = r.processo_id
									   LEFT JOIN
									   requeridos rd ON gp.processo_id = rd.processo_id
									   LEFT JOIN
									   requerente_advs ra ON gp.processo_id = ra.processo_id
									   LEFT JOIN
									   requerido_advs rda ON gp.processo_id = rda.processo_id
								 WHERE (r.requerente LIKE ? OR 
										rd.requerido LIKE ? OR 
										ra.advogado LIKE ? OR 
										rda.advogado LIKE ?) AND 
									   gp.data >= '01/01/2024'`;

                    db.get(sql, [req.body.nome], (err, row) => {
                        if (err) {
                            return reject(console.error(err.message));
                        } 
                        else if (!row){
                            logger(`Uma linha NÃO foi encontrada. Nome: ${req.body.nome}`);
                            return resolve({ db, nProcesso: false });
                        }
                        else{
                            logger(`Uma linha FOI encontrada. Nome: ${req.body.nome} Processo: ${row.numProcesso}`);
							return resolve({ db, nProcesso: row.numProcesso });
                        }
                    });
                });            
                return consultaTipo2;                    
            }

            iniciandoBD()
            .then(usandoBD)                
            .then( (resultado) => {
                fechandoBD(resultado.db);                    
                res.send({ sucesso: true, processo: resultado.nProcesso });
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
//fechado parcialmente 31/07/2024
