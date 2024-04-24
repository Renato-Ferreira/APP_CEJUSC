//Módulo de validação do LOGIN-SENHA

const openBD = require('./openDB');
const closeDB = require('./closeDB');

const validaLogin = (u, s) => {
    let bd = openBD();
    
    var user = u;
    var senha = s;
    var msg = false;

    bd.serialize( () => {
        let sql = `SELECT userName nome, userCPF cpf, password pswd FROM Usuarios`;
        bd.each(sql, (err, row) => {
            if (err) {
                return(console.error(err.message));
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
    bd = closeDB(bd);
    return(msg);
}
module.exports = validaLogin;