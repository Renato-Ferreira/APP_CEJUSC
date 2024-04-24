//Roteador simples para 

var express = require('express');
//var login = express();//linha nova
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});
// define the catraca route
router.get('/catraca', function (req, res) {
  res.send('Página aberta com sucesso!');
});
// define the login route
router.get('/login', function (req, res) {
  //res.redirect('../src/login.html');
  //login.use(express.static('login'));//linha nova
  res.redirect('../login.html');

})

module.exports = router