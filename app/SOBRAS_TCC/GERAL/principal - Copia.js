var express = require('express');
var router = express.Router();

router.route('/:id')
.all( async (req, res, next) => {

    async function geradorToken() {
        let buf = new Buffer.alloc(16);
        for (let i = 0; i < buf.length; i++) {
            buf[i] = Math.floor(Math.random() * (123 - 97)) + 97;
        }
        let token = buf.toString('utf-8');
        return token;
    };

    user = {
        id: req.params.id,
        token: await geradorToken()
    };
    console.log(`Usuário: ${user.id} Token: ${user.token}`);
    next();
})
.get( (req, res) => {
    console.log('(GET on "/principal/logado/:id") Time: ', Date.now(), '\n');
    router.use(`/logado/${user.token}`, express.static('public'));
    res.redirect(`./logado/${user.token}/src/home.html`);

    /*router.use(`/logado/${req.params.id}`, express.static('public'));
    res.redirect(`./logado/${req.params.id}/src/home.html`);*/

});
module.exports = router;