//roteador para login, requisições feitas em "/"

const loginRoute = (app) => {
    const sqlite3 = require('sqlite3').verbose();

    app.route('/')
    .get( (req, res) => {
        console.log('(GET on "/") Time: ', Date.now(), '\n');
        res.redirect('../login.html');
    });

    app.route('/valida/api')
    .post( async (req, res) => {
        console.log('(POST on "/valida/api") Time: ', Date.now(), 'Usuário: ', req.body.cpfUsuario);
        await validaUser(req.body.cpfUsuario, req.body.senhaUsuario);

        async function validaUser(user, senha) {
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
                                if (user == row.cpf && senha == row.pswd) {
                                    console.log(row.nome + " LOGOU");
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
                        console.log('Banco de Dados CEJUSC fechado.\n');
                        return resolve(msg);
                    });
                });
            };

            iniciandoBD()
                .then(usandoBD)
                .then(fechandoBD)
                .then( (resultado) => {
                        if (resultado == true) {
                            res.send(`<script>window.location.assign("http://192.168.0.104:3000/principal/${req.body.cpfUsuario}");</script>`);
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
}
module.exports = loginRoute;
//este está funcionando (19/05/2020)


