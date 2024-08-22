function pautaDia() {
    //$("#resultado_pauta").html("Renato Ferreira");

    $.ajax({
        url : "/pauta/diaria",
        method: "POST",
        data: {
            tokenBD: user.tokenDB,
            cpfUsuario: user.id
        },
    })
    .done(function(response){        
        if (response.sucesso){
            //console.log(response.linha2);
            let output = `<div class="col mt-1">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>`;
            $("#resultado_pauta_superior_1").html(output);
            $("#resultado_pauta_superior_2").html(output);
            $("#resultado_pauta_inferior_1").html(output);
            $("#resultado_pauta_inferior_2").html(output);
        } 
        else {
            $("#resultado_pauta").html(`<div class="alert alert-warning" style="width: 35rem;" role="alert">
                                    <strong>ERRO NA PESQUISA.</strong> <small>Selecione outra opção para pesquisa.</small>
                                  </div>`);
            setTimeout(function() {$("#resultado_pauta").html("");}, 3000);
        }
    })
   .fail(function(jqXHR, textStatus, response){
        alert(response);
   });

}