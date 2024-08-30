function pautaDia(opcao) {

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
            
            let output = `<div class="col mt-1">
                            <div class="card">
                                <div class="card-body">`;
            let sala1 = output + `<h5 class="card-title">SALA 1</h5>
                                    <p class="card-text">`;
            let sala2 = output + `<h5 class="card-title">SALA 2</h5>
                                    <p class="card-text">`;
            let sala3 = output + `<h5 class="card-title">SALA 3</h5>
                                    <p class="card-text">`;
            let sala4 = output + `<h5 class="card-title">SALA 4</h5>
                                    <p class="card-text">`;                                            
            let output2 = `         </p>
                                </div>
                            </div>
                        </div>`;

            for(let i=0; i < response.linha.length; i++) {
                if(response.linha[i].sala == "1") {
                    sala1 += `<span id="spanCustonCard"><b>Processo: </b>${response.linha[i].processo} - <b>Assunto: </b>${response.linha[i].assunto} - <b>Horário: </b>${response.linha[i].horario}</span><br><span id="spanCustonCard"><b>Requerente: </b>`;
                    for(let j=0; j < response.linha1.length; j++) {
                        if(response.linha[i].processo == response.linha1[j].processo) {
                            sala1 += `${response.linha1[j].requerente} - `;
                        }
                    }
                    sala1 += `</span><br><span id="spanCustonCard"><b>Requerido: </b>`;
                    for(let j=0; j < response.linha2.length; j++) {
                        if(response.linha[i].processo == response.linha2[j].processo) {
                            sala1 += `${response.linha2[j].requerido} - `;
                        }
                    }
                    sala1 += `</span><br><br>`;
                }
            }
            sala1 += output2;

            for(let i=0; i < response.linha.length; i++) {
                if(response.linha[i].sala == "2") {
                    sala2 += `<span id="spanCustonCard"><b>Processo: </b>${response.linha[i].processo} - <b>Assunto: </b>${response.linha[i].assunto} - <b>Horário: </b>${response.linha[i].horario}</span><br><span id="spanCustonCard"><b>Requerente: </b>`;
                    for(let j=0; j < response.linha1.length; j++) {
                        if(response.linha[i].processo == response.linha1[j].processo) {
                            sala2 += `${response.linha1[j].requerente} - `;
                        }
                    }
                    sala2 += `</span><br><span id="spanCustonCard"><b>Requerido: </b>`;
                    for(let j=0; j < response.linha2.length; j++) {
                        if(response.linha[i].processo == response.linha2[j].processo) {
                            sala2 += `${response.linha2[j].requerido} - `;
                        }
                    }
                    sala2 += `</span><br><br>`;
                }
            }
            sala2 += output2;

            for(let i=0; i < response.linha.length; i++) {
                if(response.linha[i].sala == "3") {
                    sala3 += `<span id="spanCustonCard"><b>Processo: </b>${response.linha[i].processo} - <b>Assunto: </b>${response.linha[i].assunto} - <b>Horário: </b>${response.linha[i].horario}</span><br><span id="spanCustonCard"><b>Requerente: </b>`;
                    for(let j=0; j < response.linha1.length; j++) {
                        if(response.linha[i].processo == response.linha1[j].processo) {
                            sala3 += `${response.linha1[j].requerente} - `;
                        }
                    }
                    sala3 += `</span><br><span id="spanCustonCard"><b>Requerido: </b>`;
                    for(let j=0; j < response.linha2.length; j++) {
                        if(response.linha[i].processo == response.linha2[j].processo) {
                            sala3 += `${response.linha2[j].requerido} - `;
                        }
                    }
                    sala3 += `</span><br><br>`;
                }
            }
            sala3 += output2;

            for(let i=0; i < response.linha.length; i++) {
                if(response.linha[i].sala == "4") {
                    sala4 += `<span id="spanCustonCard"><b>Processo: </b>${response.linha[i].processo} - <b>Assunto: </b>${response.linha[i].assunto} - <b>Horário: </b>${response.linha[i].horario}</span><br><span id="spanCustonCard"><b>Requerente: </b>`;
                    for(let j=0; j < response.linha1.length; j++) {
                        if(response.linha[i].processo == response.linha1[j].processo) {
                            sala4 += `${response.linha1[j].requerente} - `;
                        }
                    }
                    sala4 += `</span><br><span id="spanCustonCard"><b>Requerido: </b>`;
                    for(let j=0; j < response.linha2.length; j++) {
                        if(response.linha[i].processo == response.linha2[j].processo) {
                            sala4 += `${response.linha2[j].requerido} - `;
                        }
                    }
                    sala4 += `</span><br><br>`;
                }
            }
            sala4 += output2;

            switch (opcao) {
                case 1:
                    $("#resultado_pauta_superior_1").html(sala1);
                    break;
                case 2:
                    $("#resultado_pauta_superior_1").html(sala2);
                    break;
                case 3:
                    $("#resultado_pauta_superior_1").html(sala3);
                    break;
                case 4:
                    $("#resultado_pauta_superior_1").html(sala4);
                    break;
                case 0:
                    $("#resultado_pauta_superior_1").html("...");
                    $("#resultado_pauta_superior_2").html("...");
                    $("#resultado_pauta_inferior_1").html("...");
                    $("#resultado_pauta_inferior_2").html("...");
                    break;
                default:
                    $("#resultado_pauta_superior_1").html(sala1);
                    $("#resultado_pauta_superior_2").html(sala2);
                    $("#resultado_pauta_inferior_1").html(sala3);
                    $("#resultado_pauta_inferior_2").html(sala4);
                    break;
            }            
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

//------------------------------------------------------------------------------------------------------

function exibirResultado() {

}