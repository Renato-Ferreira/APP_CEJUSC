//roteador para login, requisições feitas em "/"
const sqlite3 = require('sqlite3').verbose();

const fs = require('fs');
const { join } = require('path');

const logger = require('./log/log');//new 19/06/2020

const loginRoute = (app) => {
    app.route('/')
    .get( (req, res) => {
        logger('GET', `${req.originalUrl}`);
        res.redirect('../login.html');
    });

    app.route('/valida/api')
    .all( async (req, res, next) => {

        async function geradorToken() {
            let buf = new Buffer.alloc(16);
            for (let i = 0; i < buf.length; i++) {
                buf[i] = Math.floor(Math.random() * (123 - 97)) + 97;
            }
            let token = buf.toString('utf-8');
            return token;
        };
        
        //filePath = join(__dirname, `${req.body.cpfUsuario}.json`);
        filePath = join(process.cwd(), '/login', `${req.body.cpfUsuario}.json`);
        userLogado = {
            id: req.body.cpfUsuario,
            nome: "",
            token: await geradorToken(),
            tokenDB: await geradorToken()
        };
        next();
    })    
    .post( async (req, res) => {
        logger('POST', `${req.originalUrl}`, `Usuário: ${req.body.cpfUsuario}`);
        await validaUser(req.body.cpfUsuario, req.body.senhaUsuario);

        async function validaUser(user, senha) {
            var msg = false; 

            function iniciandoBD() {
                return new Promise( (resolve, reject) => {
                    let db = new sqlite3.Database('./db/CEJUSC.db', sqlite3.OPEN_READWRITE, (err) => {
                        if (err) {
                            return reject(console.error(err.message));
                        }
                        logger('Conectado ao Banco de Dados CEJUSC.');
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
                                if (user == row.cpf && senha == row.pswd) {
                                    userLogado.nome = row.nome;
                                    fs.writeFileSync(filePath, JSON.stringify(userLogado, null, '\t'));
                                    logger(`${row.nome} >>>LOGOU`);
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
                        logger('Banco de Dados CEJUSC fechado.');
                        return resolve(msg);
                    });
                });
            };

            iniciandoBD()
                .then(usandoBD)
                .then(fechandoBD)
                .then( (resultado) => {
                        if (resultado == true) {
                            res.send(`<script>window.location.assign("http://192.168.0.104:3000/principal/${req.body.cpfUsuario}.${userLogado.token}.presenca");</script>`);
                        }
                        else {
                            res.send('<script>window.location.assign("http://192.168.0.104:3000");alert("Usuário ou Senha inválidos!");</script>');
                        }
                    },
                    (error) => {
                        console.log(`DEU ZICA !!!! [ ${error} ]`);
                    }
                );

        }
    });

    app.route('/logout/:id')
    .get( (req, res ) => {
        logger('GET', `${req.originalUrl}`, `Usuário ${req.params.id} DESLOGOU >>>`);
        filePath = join(process.cwd(), '/login', `${req.params.id}.json`);
        fs.writeFileSync(filePath, '{}');
        res.send('<script>window.location.assign("http://192.168.0.104:3000");</script>');
    });

}
module.exports = loginRoute;
//este está funcionando (19/06/2020)


