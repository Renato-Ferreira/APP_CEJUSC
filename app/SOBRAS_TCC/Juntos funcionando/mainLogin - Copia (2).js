//Script para manipulação do formulário de LOGIN
$(document).ready( () => {

    $("#btnE").click( (event) => {
        //alert( "DEU CERTO:\n" + "Usuário: " + $("#cpfUsuario").val() + "\nSenha: " + $("#senhaUsuario").val() );
        //console.log("deu certo");
        let end = "/valida/api/" + $("#cpfUsuario").val() + "." + $("#senhaUsuario").val();
        $.ajax({
            url : end,
            method: "GET",            
        })
       .done(function(response){
            alert(response + " !");
            if (response == true) {
                window.location.assign("http://192.168.0.103:3000/home");
            }
            else {
                alert(response + " !");
            }
            //alert(response + " !");
            //response;
       })
       .fail(function(jqXHR, textStatus, response){
            alert(response);
       });
    });    

});
