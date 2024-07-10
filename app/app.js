//iniciando um SERVIDOR
const express = require('express');
const app = express();
const port = 3000;
const enderecoIP = '192.168.0.101';

app.listen(port, enderecoIP, () => console.log(`Neste momento o APP esta escutando em http://${enderecoIP}:${port}`));
//

//necessário para o parsing do APP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//

//habilita o uso dos arquivos estáticos dentro da pasta
app.use(express.static('node_modules'));
//

//middleware do LOGIN
var login = (req, res, next) => {
    app.use(express.static('login'));
    const rotaInicial = require('./routes/login');
    rotaInicial(app);
    next();
}
app.use('/', login);
//

//middleware das rotas principais do APP
var routerPrincipal = require('./routes/principal');
app.use('/principal', routerPrincipal);
//

//middleware para presença
var presenca = (req, res, next) => {
    const routerPresenca = require('./routes/rotapresenca');
    routerPresenca(app);
    next();
}
app.use('/presenca', presenca);

//middleware para reclamação
var reclamacao = (req, res, next) => {
    const routerReclamacao = require('./routes/recroute');
    routerReclamacao(app);
    next();
}
app.use('/reclamacao', reclamacao);
//
