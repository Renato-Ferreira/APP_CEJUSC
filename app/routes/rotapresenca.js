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
                    completa: "",
					requerente: [],
                    check_rqrnt: [],
					adv_requerente: [],
                    check_adv_rqrnt: [],
					requerido: [],
                    check_rqrd: [],
					adv_requerido: [],
                    check_adv_rqrd: [],
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
                                let sql = `SELECT a.assunto AS assunto, b.data AS data, b.horario AS horario, b.sala AS sala, b.situacao AS situacao, b.completa AS completa
                                            FROM processos a, geral_processos b
                                            WHERE a.processo_id = ? AND a.processo_id = b.processo_id`;
                            
                                let sql2 = `SELECT DISTINCT a.requerente AS requerente, a.presenca AS check_rqrnt
                                            FROM requerentes a
                                            WHERE a.processo_id = ? AND
                                            a.data >= '01/01/2024'`;

                                let sql3 = `SELECT DISTINCT a.advogado AS advogado_rqrnt, a.presenca AS check_adv_rqrnt
                                            FROM requerente_advs a
                                            WHERE a.processo_id = ? AND
                                            a.data >= '01/01/2024'`;

                                let sql4 = `SELECT DISTINCT a.requerido AS requerido, a.presenca AS check_rqrd
                                            FROM requeridos a
                                            WHERE a.processo_id = ? AND
                                            a.data >= '01/01/2024'`;

                                let sql5 = `SELECT DISTINCT a.advogado AS advogado_rqrd, a.presenca AS check_adv_rqrd
                                            FROM requerido_advs a
                                            WHERE a.processo_id = ? AND
                                            a.data >= '01/01/2024'`;

                                db.each(sql2, [filipeta.processo], (err, row) => {
                                    if(err) {
                                        return reject(console.error(err.message));
                                    }
                                    else {                                            
                                        filipeta.requerente.push(row.requerente);
                                        filipeta.check_rqrnt.push(row.check_rqrnt);
                                    }
                                });
                                db.each(sql3, [filipeta.processo], (err, row) => {
                                    if(err) {
                                        return reject(console.error(err.message));
                                    }
                                    else {                                            
                                        filipeta.adv_requerente.push(row.advogado_rqrnt);
                                        filipeta.check_adv_rqrnt.push(row.check_adv_rqrnt);
                                    }
                                });
                                db.each(sql4, [filipeta.processo], (err, row) => {
                                    if(err) {
                                        return reject(console.error(err.message));
                                    }
                                    else {                                            
                                        filipeta.requerido.push(row.requerido);
                                        filipeta.check_rqrd.push(row.check_rqrd);
                                    }
                                });
                                db.each(sql5, [filipeta.processo], (err, row) => {
                                    if(err) {
                                        return reject(console.error(err.message));
                                    }
                                    else {                                            
                                        filipeta.adv_requerido.push(row.advogado_rqrd);
                                        filipeta.check_adv_rqrd.push(row.check_adv_rqrd);
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
                                        filipeta.completa = row.completa;
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

    app.route('/presenca/check')
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
        
		await update1();
		
        async function update1() {

            async function usandoBD(db) {
					
                let updateTipo1 = new Promise( (resolve, reject) => {                    
                    let sql = `UPDATE ${req.body.tabela}
                                SET presenca = ?
                                WHERE processo_id = ? AND ${req.body.coluna} = ? AND data >= '01/01/2024'`;
                    let data = [];
                    for (let i = 0; i < req.body.nomes.length; i++) {
                        data = [];
                        data.push(req.body.valores[i], req.body.processo, req.body.nomes[i]);
                        db.run(sql, data, function(err) {
                            if (err) {
                              return reject(console.error(err.message));
                            }
                            logger(`Uma linha foi atualizada. UPDATE: ${this.changes}`);
                        });
                    }
                    return resolve(db);                 
                });            
                return updateTipo1;                    
            }

            iniciandoBD()
            .then(usandoBD)                
            .then( (resultado) => {
                fechandoBD(resultado);                    
                res.send({ sucesso: true });
                },
                (error) => {
                    console.log(`DEU ZICA !!!! [ ${error} ]`);
                    res.send({ sucesso: false, erro: error.message });
                }
            );             
        }
    });

    app.route('/presenca/check/completa')
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
        
		await update2();
		
        async function update2() {

            async function usandoBD(db) {
					
                let updateTipo2 = new Promise( (resolve, reject) => {                    
                    let sql = `UPDATE geral_processos
                                SET completa = ?
                                WHERE processo_id = ? AND data >= '01/01/2024'`;
                    let data = [req.body.valor, req.body.processo];                   
					db.run(sql, data, function(err) {
						if (err) {
						  return reject(console.error(err.message));
						}
						logger(`Uma linha foi atualizada. UPDATE: ${this.changes}`);
					});                    
                    return resolve(db);                 
                });            
                return updateTipo2;                    
            }

            iniciandoBD()
            .then(usandoBD)                
            .then( (resultado) => {
                fechandoBD(resultado);                    
                res.send({ sucesso: true });
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
