//roteador para login, requisições feitas em "/"

const loginRoute = (app) => {
    app.route('/')
    .get( (req, res) => {
        console.log('(GET on "/") Time: ', Date.now());
        res.redirect('../login.html');
    });

    app.route('/valida/api/:userID.:userSenha')
    .get( (req, res, next) => {
        
            function promiseBD() {
                return new Promise( (resolve, reject) => {
                    var validar = require('../db/apiValida');
                    return resolve(validar);
                });
            };
            
            function promiseBD2(validar) {
                return new Promise( (resolve, reject) => {
                    var r = validar("13326574860", "123@");
                    return resolve(r);//new new
                });
            };
            
            function promiseBD3(r) {
                return new Promise( (resolve, reject) => {
                    return resolve( console.log(r) );//new new
                });
            };

            promiseBD()
                .then(promiseBD2)
                .then(promiseBD3)
                .then(
                    (resultado) => {
                        console.log(resultado);//new
                        res.send("OLÁ");
                    },
                    (error) => {
                        console.log(`DEU ZICA !!!! [ ${error} ]`);
                    }
                );
        
        next();
    }, function(req, res) {console.log("cheguei aqui")}
    );
}
module.exports = loginRoute;
//este está funcionando