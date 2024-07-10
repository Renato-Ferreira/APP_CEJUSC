function filipetaVirtual1(){
        
    $.ajax({
        url : "/presenca/processo",
        method: "POST",
        data: {
            tokenBD: user.tokenDB,
            cpfUsuario: user.id,
            processo: $("#dadosBuscaPresenca").val()            
        },
    })
   .done(function(response){
       if (response == true){
           $("#resultado").html('<div class="alert alert-success" role="alert"><small>Dados <b>GRAVADOS</b> com sucesso.</small></div>');
       }
       else{
           //let link = "http://192.168.0.101:3000/principal/" + user.id + "." + user.token + ".andamento";
           $("#resultado").html(`<div class="alert alert-warning" role="alert"><small>Processo já existe. Selecione </small><a href=${link} class="alert-link">ANDAMENTO</a><small> para modificar os dados.</small></div>`);
       }
   })
   .fail(function(jqXHR, textStatus, response){
        alert(response);
   });
};


//fechado 24/06/2020
