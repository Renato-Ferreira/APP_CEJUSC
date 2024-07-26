$( () => {
    //captura o parâmetro passado pela URL
    let url = window.location.href;	
    let query = url.split('?');
	var parametro = query[1].split('=');
    //

    //resgata informações do usuário
    let end = "/" + parametro[1] + ".json";
    resgataUser(end);

    function resgataUser(end){
        $.ajax({
            url : end,
            method: "GET",            
        })
       .done(function(response){
            user = response;
            $("#userRef").html("OLÁ " + response.nome);
            $("#1").attr("href", "http://192.168.0.107:3000/principal/" + response.id + "." + response.token + ".presenca");
            $("#2").attr("href", "http://192.168.0.107:3000/principal/" + response.id + "." + response.token + ".conciliador");
            $("#3").attr("href", "http://192.168.0.107:3000/principal/" + response.id + "." + response.token + ".completas");
            $("#4").attr("href", "http://192.168.0.107:3000/principal/" + response.id + "." + response.token + ".pauta");
       })
       .fail(function(jqXHR, textStatus, response){
            alert(response);
       });
    }
    //

    //link para deslogar
    $("#logout").attr("href", `http://192.168.0.107:3000/logout/${parametro[1]}`);
});
