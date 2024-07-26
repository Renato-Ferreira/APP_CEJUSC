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
        if (response.sucesso){
            $("#resultado").html(`<div class="alert alert-success" role="alert"><small>Dados <b>ENCONTRADOS</b> com sucesso. Tema: ${response.filipeta.assunto}</small></div>`);
        } else {
            $("#resultado").html(`<div class="alert alert-danger" role="alert"><small>Dados <b>NÃO ENCONTRADOS</b>. Tema: ${response.sucesso}</small></div>`);
        }
    })
   .fail(function(jqXHR, textStatus, response){
        alert(response);
   });
}


//fechado parcialmente 26/07/2024
