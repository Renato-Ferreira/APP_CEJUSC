//roteador para login, requisições feitas em "/"

const loginRoute = (app) => {
    app.route('/')
    .get( (req, res) => {
        console.log('(GET on "/") Time: ', Date.now());
        res.redirect('../login.html');
    });

    app.route('/valida/api/:userID.:userSenha')
    .get( (req, res, next) => {
        console.log('(GET on "/valida/api/:userId.:userSenha") Time: ', Date.now(), 'Usuário: ', req.params.userID);
        var valida = require('../db/apiValida');
        let resp = valida(req.params.userID, req.params.userSenha);
        console.log(resp + "000");
        next();
        }, function(req, res){
            res.send("retornou >>>");
    });
}
module.exports = loginRoute;
//este está funcionando