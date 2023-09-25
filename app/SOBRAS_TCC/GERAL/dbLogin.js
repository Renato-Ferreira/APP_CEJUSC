const sqlite3 = require('sqlite3').verbose();

// abrindo o banco de dados
function openBD(){
  let db = new sqlite3.Database('./db/CEJUSC.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return(console.error(err.message));
    }
    console.log('Módulo LOGIN conectado ao Banco de Dados CEJUSC.');
  });
  return(db);
}

// fechando o banco de dados
function closeDB(db){
  db.close((err) => {
    if (err) {
      return(console.error(err.message));
    }
    console.log('Módulo LOGIN fechou o Banco de Dados CEJUSC.');
  });
  return(db); //preciso verificar a necessidade deste return
}

const tabela = () => {
  let bd = openBD();

  bd.serialize(() => {
    let sql = `SELECT numero_reclamacao as id, data as data, hora as hora, sala as sala FROM Agendamento`;
    bd.each(sql, (err, row) => {
      if (err) {
        return(console.error(err.message));
      }
        console.log(`${row.id} \| ${row.data} \| ${row.hora} \| ${row.sala}`); //console.log(row.id + "\t" + row.data + "\t" + row.hora + "\t" + row.sala); saída tabulada
    });
  });

  bd = closeDB(bd);
}
module.exports = tabela;
