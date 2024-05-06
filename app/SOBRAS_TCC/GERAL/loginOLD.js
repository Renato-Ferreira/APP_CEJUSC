//roteador para login, requisições feitas em "/"

const loginRoute = (app) => {
    app.route('/')
    .get( (req, res) => {
        res.redirect('../login.html');
        console.log('(GET on "/") Time: ', Date.now());
    })
    .post( (req, res) => {
        console.log('(POST on "/") Time: ', Date.now(), 'Usuário: ', req.body.cpfUsuario);
        let valida = require('../db/validaLogin');
        valida(req.body.cpfUsuario, req.body.senhaUsuario);
        res.send('<script>window.location.assign("http://192.168.0.104:3000/home");</script>');
        })
}

module.exports = loginRoute;



        //res.json(req.body);
        //res.redirect('http://192.168.0.104:3000/home');

        /*.post( (req, res, next) => {
            console.log('(POST on "/") Time: ', Date.now(), 'Usuário: ', req.body.cpfUsuario);
            let resp;
            let valida = require('../db/validaLogin');
            resp = valida(req.body.cpfUsuario, req.body.senhaUsuario);
            console.log(resp);
            next();
            }, (req, res) => {
                    res.send('<script>window.location.assign("http://192.168.0.104:3000/home");</script>');
            })*/

            /*var resp = new Promise( (resolve, reject) => {
                let msg = require('../db/validaLogin');
                let m = msg(req.body.cpfUsuario, req.body.senhaUsuario);
                console.log("valor de m: " + m);
                if (m == true) {resolve(m)};
                reject("negado");
            })
            resp.then( data => res.send(data) );
            resp.catch( data => res.send(data) );*/

        //res.redirect('http://192.168.0.104:3000/home');
        //res.send('<script>window.location.assign("http://192.168.0.104:3000/home");</script>');
    
    

