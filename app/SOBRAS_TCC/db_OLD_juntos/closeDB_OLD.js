// Módulo para fechamento do banco de dados
const closeDB = (db) => {
    db.close((err) => {
        if (err) {
            return(console.error(err.message));
        }
        console.log('Módulo LOGIN fechou o Banco de Dados CEJUSC.');
    });
    return(db);
}
module.exports = closeDB;