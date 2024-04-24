const sqlite3 = require('sqlite3').verbose();

// Módulo para abertura do banco de dados
const openBD = () => {
    let db = new sqlite3.Database('./db/CEJUSC.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return(console.error(err.message));
        }
        console.log('Módulo LOGIN conectado ao Banco de Dados CEJUSC.');
    });
    return(db);
}
module.exports = openBD;