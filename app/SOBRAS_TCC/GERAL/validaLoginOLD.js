//Módulo de vlidação do usuário/senha
const openBD = require('./openDB');
const closeDB = require('./closeDB');


const validaLogin = (u, s) => {
    let bd = openBD();
    var user = u;
    var senha = s;
    var oK = false;
  
    bd.serialize(() => {
      let sql = `SELECT userName nome, userCPF cpf, password pswd FROM Usuarios`;
      bd.each(sql, (err, row) => {
        if (err) {
          return(console.error(err.message));
        }
        else{
          console.log(oK);
          console.log(user, senha);
          console.log(row.cpf, row.pswd);
          if (user == row.cpf && senha == row.pswd) {
            oK = true;
            console.log(row.nome);
          }
        }
      });
    });
  
    bd = closeDB(bd);
    //return(oK);
  }
  module.exports = validaLogin;
  