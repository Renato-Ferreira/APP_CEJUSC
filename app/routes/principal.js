var express = require('express');
var router = express.Router();

const fs = require('fs');
const { join } = require('path');

const logger = require('./log/log');//new 19/06/2020

router.route('/:id.:token.:page')
.all( async (req, res, next) => {
    logger('GET', `${req.originalUrl}`);
    //filePath = join(__dirname, `${req.params.id}.json`);
    filePath = join(process.cwd(), '/login', `${req.params.id}.json`);
    let data = fs.readFileSync(filePath);
    userLogado = JSON.parse(data);

    router.use(`/logado`, express.static('public'));
    next();
})
.get( (req, res) => {      
    if (req.params.token == userLogado.token) {
        switch(req.params.page) {
            case "presenca":
                res.redirect(`./logado/src/presenca.html?user=${req.params.id}`);
                break;
            case "conciliador":
                res.redirect(`./logado/src/conciliador.html?user=${req.params.id}`);
                break;
            case "completas":
                res.redirect(`./logado/src/completas.html?user=${req.params.id}`);
                break;
            case "pauta":
                res.redirect(`./logado/src/pauta.html?user=${req.params.id}`);
                break;
        }
    }
});
module.exports = router;