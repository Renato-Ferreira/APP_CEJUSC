function consultaCEP(){
    var cep = document.getElementById("cep").value;
    var urlInput = "https://viacep.com.br/ws/" + cep + "/json/";
    //alert(cep);
    $.ajax({
        url: urlInput,
        method: "GET",
        success: function(response){
            console.log(response);
            //alert(response.logradouro);
            $("#logradouro").html(response.logradouro);
            $("#bairro").html(response.bairro);
            $("#localidade").html(response.localidade);
            $("#uf").html(response.uf);

            //document.getElementById("logradouro").innerHTML = response.logradouro;
            //document.getElementById("bairro").innerHTML = response.bairro;
            //document.getElementById("localidade").innerHTML = response.localidade;
            //document.getElementById("uf").innerHTML = response.uf;

        }        
    });
}

function closeAlert() { $(".alert").alert('close'); }
