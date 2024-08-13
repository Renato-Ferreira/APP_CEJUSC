function cadastraProcesso(){
    
    var dataBR = $("#data").val();
    dataBR =  dataBR.split('-').reverse().join('/');
    
    $.ajax({
        url : "/reclamacao/agendar",
        method: "POST",
        data: {
            tokenBD: user.tokenDB,
            cpfUsuario: user.id,
            processo: $("#numProcesso").val(),
            date: dataBR,
            sala: $("#sala-inputGroupSelect").val(),
            hora: $("#hora").val()
        },
    })
   .done(function(response){
       if (response == true){
           $("#rA").html('<div class="alert alert-success" role="alert"><small>Dados <b>GRAVADOS</b> com sucesso.</small></div>');
       }
       else{
           let link = "http://192.168.0.104:3000/principal/" + user.id + "." + user.token + ".andamento";
           $("#rA").html(`<div class="alert alert-warning" role="alert"><small>Processo já existe. Selecione </small><a href=${link} class="alert-link">ANDAMENTO</a><small> para modificar os dados.</small></div>`);
       }
   })
   .fail(function(jqXHR, textStatus, response){
        alert(response);
   });
};

function cadastraParte(num){
    resumo(num);
    let nomes = [];
    let nomeID = "";
    for (let i=1; i <= num; i++) {
        nomeID= "nome" + i;        
        nomes.push($(`#${nomeID}`).val());
    };
    let placeholders = nomes.map((name) => `("${$("#numProcesso").val()}", "${name}")`).join(',');
    let sqlInsert = `INSERT INTO ${tipo} (processo, nome) VALUES ` + placeholders;

    $.ajax({
        url : "/reclamacao/partes",
        method: "POST",
        data: {
            tokenBD: user.tokenDB,
            cpfUsuario: user.id,
            processo: $("#numProcesso").val(),
            sql: sqlInsert
        },
    })
   .done(function(response){
       if (response == true){
           $("#r").html('<div class="alert alert-success" role="alert"><small>Dados <b>GRAVADOS</b> com sucesso.</small></div>');
       }
       else{
           let link = "http://192.168.0.104:3000/principal/" + user.id + "." + user.token + ".andamento";
           $("#r").html(`<div class="alert alert-warning" role="alert"><small>PROCESSO não cadastrado. Dados não foram gravados</small></div>`);
       }
   })
   .fail(function(jqXHR, textStatus, response){
        alert(response);
   });
};
//fechado 24/06/2020