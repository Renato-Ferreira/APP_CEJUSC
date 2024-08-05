const { response } = require("express");
var papeleta = {};

function filipetaVirtual1(numProcesso){
        
    $.ajax({
        url : "/presenca/processo",
        method: "POST",
        data: {
            tokenBD: user.tokenDB,
            cpfUsuario: user.id,
            processo: numProcesso
        },
    })
    .done(function(response){ 
        papeleta = response.filipeta;       
        if (response.sucesso && response.filipeta.preenchida){
            // Inicialize a string de saída com o conteúdo HTML fixo
            let output = `
                <div class="card border-success mb-3">
                    <div class="card-header"><b>FILIPETA</b>
                        <button type="button" class="btn-close position-absolute end-0" id= "closeFilipeta" aria-label="closeFilipeta"></button>
                    </div>
                    <div class="card-body text-success">
                        <p class="card-text" id="filipetaSpan">
                            <span><b>PROCESSO:</b> ${response.filipeta.processo}</span>
                            <span><b>ASSUNTO:</b> ${response.filipeta.assunto}</span>
                            <span><b>DATA:</b> ${response.filipeta.data}</span>
                            <span><b>HORÁRIO:</b> ${response.filipeta.horario}</span>
                            <span><b>SALA:</b> ${response.filipeta.sala}</span>
                        </p>
                        <p class="card-text"><a href="#" class="custom-link" onclick="papeletaCheck(1)"><b>REQUERENTE: </b></a>`; 
            for (let i = 0; i < response.filipeta.requerente.length; i++) {
                output += `${response.filipeta.requerente[i]}`;
                if (response.filipeta.check_rqrnt[i]) {
                    output += ` ${response.filipeta.check_rqrnt[i]} - `;
                }
                else {
                    output += ` - `;
                }
            }
            output += `<br>
						<span><a href="#" class="custom-link" onclick="papeletaCheck(2)"><b>ADVOGADO DO REQUERENTE: </b></a>`; 
            
            for (let i = 0; i < response.filipeta.adv_requerente.length; i++) {
                output += `${response.filipeta.adv_requerente[i]}`;
                if (response.filipeta.check_adv_rqrnt[i]) {
                    output += ` ${response.filipeta.check_adv_rqrnt[i]} - `;
                }
                else {
                    output += ` - `;
                }
            }
            output += `</span>
                        </p>
                        <p class="card-text"><a href="#" class="custom-link" onclick="papeletaCheck(3)"><b>REQUERIDO: </b></a>`;                        
            for (let i = 0; i < response.filipeta.requerido.length; i++) {
                output += `${response.filipeta.requerido[i]}`;
                if (response.filipeta.check_rqrd[i]) {
                    output += ` ${response.filipeta.check_rqrd[i]} - `;
                }
                else {
                    output += ` - `;
                }
            }
            output += `<br>
						<span><a href="#" class="custom-link" onclick="papeletaCheck(4)"><b>ADVOGADO DO REQUERIDO: </b></a>`; 
            
            for (let i = 0; i < response.filipeta.adv_requerido.length; i++) {
                output += `${response.filipeta.adv_requerido[i]}`;
                if (response.filipeta.check_adv_rqrd[i]) {
                    output += ` ${response.filipeta.check_adv_rqrd[i]} - `;
                }
                else {
                    output += ` - `;
                }
            }
            output += `</span>
                        </p>
                    </div>
                </div>`;
            
            // Atualize o conteúdo do elemento com id "resultado"
            $("#resultado").html(output);
            $("#closeFilipeta").on("click", function() {$("#resultado").html("");});
            /*$('.custom-link').on('click', function(event) {
                event.preventDefault(); // Impede o comportamento padrão do link
                $('#exampleModal').modal('show');
            }); */        
        } 
        else {
            $("#resultado").html(`<div class="alert alert-warning" style="width: 35rem;" role="alert">
                                    <strong>DADOS NÃO ENCONTRADOS.</strong> <small>Selecione outra opção para pesquisa.</small>
                                  </div>`);
            setTimeout(function() {$("#resultado").html("");}, 3000);
        }
    })
   .fail(function(jqXHR, textStatus, response){
        alert(response);
   });
}

function filipetaVirtual2(name){
        
    $.ajax({
        url : "/presenca/nome",
        method: "POST",
        data: {
            tokenBD: user.tokenDB,
            cpfUsuario: user.id,
            nome: name
        },
    })
    .done(function(response){        
        if (response.sucesso && response.processo){
            filipetaVirtual1(response.processo);
        } 
        else {
            $("#resultado").html(`<div class="alert alert-warning" style="width: 35rem;" role="alert">
                                    <strong>DADOS NÃO ENCONTRADOS.</strong> <small>Selecione outra opção para pesquisa.</small>
                                  </div>`);
            setTimeout(function() {$("#resultado").html("");}, 3000);
        }
    })
   .fail(function(jqXHR, textStatus, response){
        alert(response);
   });
}


/*-------------------------------------------------------------------------------------------------------------------------------------*/

function papeletaCheck(num) {
    // Usa jQuery para acionar o modal
    $('#papeletaModal').modal('show');
    $("#papeletaLabel").html("Selecione para Presença");
    let outputP8 = ``;
    let outputP4 = ``;
    switch (num) {
        case 1:
            for (let i=0; i < papeleta.requerente.length; i++){
                outputP8 += `<div>${papeleta.requerente[i]}</div>`;
                outputP4 += `<div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions${i}" id="inlineRadio1${i}" value="option1${i}">
                                <label class="form-check-label" for="inlineRadio1${i}"><b><small>PRESENÇA</small></b></label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions${i}" id="inlineRadio2${i}" value="option2${i}">
                                <label class="form-check-label" for="inlineRadio2${i}"><b><small>AUSÊNCIA</small></b></label>
                            </div>`;
            }
            break;
        case 2:
            for (let i=0; i < papeleta.adv_requerente.length; i++){
                outputP8 += `<div>${papeleta.adv_requerente[i]}</div>`;
                outputP4 += `<div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions${i}" id="inlineRadio1${i}" value="option1${i}">
                                <label class="form-check-label" for="inlineRadio1${i}"><b><small>PRESENÇA</small></b></label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions${i}" id="inlineRadio2${i}" value="option2${i}">
                                <label class="form-check-label" for="inlineRadio2${i}"><b><small>AUSÊNCIA</small></b></label>
                            </div>`;
            }
            break;
        case 3:
            for (let i=0; i < papeleta.requerido.length; i++){
                outputP8 += `<div>${papeleta.requerido[i]}</div>`;
                outputP4 += `<div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions${i}" id="inlineRadio1${i}" value="option1${i}">
                                <label class="form-check-label" for="inlineRadio1${i}"><b><small>PRESENÇA</small></b></label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions${i}" id="inlineRadio2${i}" value="option2${i}">
                                <label class="form-check-label" for="inlineRadio2${i}"><b><small>AUSÊNCIA</small></b></label>
                            </div>`;
            }
            break;
        case 4:
            for (let i=0; i < papeleta.adv_requerido.length; i++){
                outputP8 += `<div>${papeleta.adv_requerido[i]}</div>`;
                outputP4 += `<div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions${i}" id="inlineRadio1${i}" value="option1${i}">
                                <label class="form-check-label" for="inlineRadio1${i}"><b><small>PRESENÇA</small></b></label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions${i}" id="inlineRadio2${i}" value="option2${i}">
                                <label class="form-check-label" for="inlineRadio2${i}"><b><small>AUSÊNCIA</small></b></label>
                            </div>`;
            }
            break;
    
        default:
            break;
    }
    
    $("#papeletaVirtual1").html(outputP8);
    $("#papeletaVirtual2").html(outputP4);
}

//fechado parcialmente 31/07/2024
