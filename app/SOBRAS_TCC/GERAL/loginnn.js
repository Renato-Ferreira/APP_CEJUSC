//roteador para login, requisições feitas em "/"

const loginRoute = (app) => {

    app.route('/')
    .get( (req, res) => {
        console.log('(GET on "/") Time: ', Date.now());
        res.redirect('../login.html');
    });

    app.route('/valida/api/:userID.:userSenha')    
    .get( async (req, res) => {
        console.log('(GET on "/valida/api/:userId.:userSenha") Time: ', Date.now(), 'Usuário: ', req.params.userID);
        await validaUser(req.params.userID, req.params.userSenha);

        async function validaUser(user, senha) {
            iniciandoBD = require('../db/openDB');
            fechandoBD = require('../db/closeDB');
            var msg = false; 


            function usandoBD(db) {
                return new Promise( (resolve, reject) => {
                    db.serialize( () => {
                        let sql = `SELECT userName nome, userCPF cpf, password pswd FROM Usuarios`;
                        db.each(sql, (err, row) => {
                            if (err) {
                                return reject(console.error(err.message));
                            }
                            else{
                                console.log(msg);
                                console.log(user, senha);
                                console.log(row.cpf, row.pswd);
                                if (user == row.cpf && senha == row.pswd) {
                                    console.log(row.nome);
                                    msg = true;
                                }
                            }
                        });
                    });
                    return resolve(db, msg);
                });
            };


            iniciandoBD()
                .then(usandoBD)
                .then(fechandoBD)
                .then( (resultado) => {
                        console.log(resultado + " dentro do BD");
                        res.send(resultado);
                    },
                    (error) => {
                        console.log(`DEU ZICA !!!! [ ${error} ]`);
                    }
                );

        }
    });
}
module.exports = loginRoute;
//(19/05/2020).... não consegui resolver o problema da variável msg para quebrar o código em módulos


