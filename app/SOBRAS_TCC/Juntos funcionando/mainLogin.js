//Script para manipulação do formulário de LOGIN
$( () => {

    $("#btnE").click( (event) => {
        let end = "/valida/api/" + $("#cpfUsuario").val() + "." + $("#senhaUsuario").val();
        validar(end);
    });    

    function validar(end){
        $.ajax({
            url : end,
            method: "GET",            
        })
       .done(function(response){
            if (response == true) {
                window.location.assign("http://192.168.0.104:3000/home");
            }
            else if (response == false) {
                alert("Usuário ou Senha incorretos !!!");
            }
            else {
                alert(response + " !");
            }
       })
       .fail(function(jqXHR, textStatus, response){
            alert(response);
       });
    }

});
//este está funcionando apesar de umas inconsistências no primeiro acesso