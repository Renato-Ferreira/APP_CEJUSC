const openBD = require('./openDB');
const closeDB = require('./closeDB');

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
  