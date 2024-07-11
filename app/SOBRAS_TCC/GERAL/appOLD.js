//Iniciando um servidor

const express = require('express');
const app = express();
const port = 3000;

//habilita o uso de arquivos estáticos dentro das pastas
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use(express.static('login'));//linha nova


//Criação de um roteador simples
var router = require('./routes/admin');
app.use('/admin', router);

/*demonstra a utilização do módulo do Banco de Dados
var dB = require('./db/db')*/

app.get('/', (req, res) => res.redirect('./src/home.html')); //Página inicial do meu APP
//app.get('/', (req, res) => res.redirect('login.html')); //Página inicial do meu APP


//ESCUTANDO !!!
app.listen(port, () => console.log(`Neste momento o APP esta escutando em http://192.168.0.102:${port}`));
