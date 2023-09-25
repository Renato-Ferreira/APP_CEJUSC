//Módulo de validação do LOGIN-SENHA

const openBD = require('./openDB');
const closeDB = require('./closeDB');

const validaLogin = (user, senha) => {
    let bd = openBD();
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
                    return(msg);
                }
            }
        });
    });
    bd = closeDB(bd);
    /*console.log(msg + "<<<<");
    return("olá");*/
}
module.exports = validaLogin;