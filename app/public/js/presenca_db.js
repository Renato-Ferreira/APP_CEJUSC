//const { response } = require("express");
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
                            <span><a href="#" class="custom-link" onclick="papeletaCompleta()"><b>PROCESSO:</b></a> ${response.filipeta.processo}`;
            if (response.filipeta.completa) {
                output += ` ${response.filipeta.completa}`;
            }
            output += `</span>
                            <span><b>ASSUNTO:</b> ${response.filipeta.assunto}</span>
                            <span><b>DATA:</b> ${response.filipeta.data}</span>
                            <span><b>HORÁRIO:</b> ${response.filipeta.horario}</span>
                            <span><b>SALA:</b> ${response.filipeta.sala}</span>
                            <span><b>SITUAÇÃO:</b> ${response.filipeta.situacao}</span>
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

function atualizaPresenca(inf){    
    let tabela = "";
    let coluna = "";
    let nomes = [];
    let valores = [];
    switch (inf.codUpdate[0].slice(1,2)) {
        case "1":
            tabela = "requerentes";
            coluna = "requerente";
            for (let i = 0; i < inf.codUpdate.length; i++) {
                nomes.push(papeleta.requerente[inf.codUpdate[i].slice(2,3)]);
                if (inf.codUpdate[i].slice(3) == 1) {
                    valores.push('<span class="custom-check-mark"><b>&check;</b></span>');
                }
                else {
                    valores.push("");
                }
            }            
            break;
        case "2":
            tabela = "requerente_advs";
            coluna = "advogado";
            for (let i = 0; i < inf.codUpdate.length; i++) {
                nomes.push(papeleta.adv_requerente[inf.codUpdate[i].slice(2,3)]);
                if (inf.codUpdate[i].slice(3) == 1) {
                    valores.push('<span class="custom-check-mark"><b>&check;</b></span>');
                }
                else {
                    valores.push("");
                }
            } 
            break;
        case "3":
            tabela = "requeridos";
            coluna = "requerido";
            for (let i = 0; i < inf.codUpdate.length; i++) {
                nomes.push(papeleta.requerido[inf.codUpdate[i].slice(2,3)]);
                if (inf.codUpdate[i].slice(3) == 1) {
                    valores.push('<span class="custom-check-mark"><b>&check;</b></span>');
                }
                else {
                    valores.push("");
                }
            }
            break;
        case "4":
            tabela = "requerido_advs";
            coluna = "advogado";
            for (let i = 0; i < inf.codUpdate.length; i++) {
                nomes.push(papeleta.adv_requerido[inf.codUpdate[i].slice(2,3)]);
                if (inf.codUpdate[i].slice(3) == 1) {
                    valores.push('<span class="custom-check-mark"><b>&check;</b></span>');
                }
                else {
                    valores.push("");
                }
            }
            break;
        default:
            break;
    }
   
    $.ajax({
        url : "/presenca/check",
        method: "POST",
        data: {
            tokenBD: user.tokenDB,
            cpfUsuario: user.id,
            processo: inf.processo,
            tabela,
            coluna,
            nomes,
            valores
        }
    })
    .done(function(response){        
        if (response.sucesso){
            filipetaVirtual1(inf.processo);
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

function updateCompleta(valorSet){    
    let valor ="";
    if (valorSet) {
        valor = `<span class="custom-copy"><b>&copy;</b></span>`;
    }
    $("#genericModal").modal("hide");
    $.ajax({
        url : "/presenca/check/completa",
        method: "POST",
        data: {
            tokenBD: user.tokenDB,
            cpfUsuario: user.id,
            processo: papeleta.processo,
            valor
        },
    })
    .done(function(response){        
        if (response.sucesso){
            filipetaVirtual1(papeleta.processo);
        } 
        else {
            $("#resultado").html(`<div class="alert alert-warning" style="width: 35rem;" role="alert">
                                    <strong>OCORREU UM PROBLEMA.</strong> <small>Refaça sua pesquisa e tente novamente.</small>
                                  </div>`);
            setTimeout(function() {$("#resultado").html("");}, 3000);
        }
    })
   .fail(function(jqXHR, textStatus, response){
        alert(response);
   });
}

function insertNewPart(){
    let dadosDB = JSON.parse($("#saveButton").attr("data-dados"));
    let nomeParte = $("#geralEntradaParte").val();    
    $("#genericModal").modal("hide");

    if (nomeParte) {
        $.ajax({
            url : "/presenca/add/novaparte",
            method: "POST",
            data: {
                tokenBD: user.tokenDB,
                cpfUsuario: user.id,
                processo: papeleta.processo,
                tabela: dadosDB.tabelaDB,
                coluna: dadosDB.colunaDB,
                nomeParte
            },
        })
        .done(function(response){        
            if (response.sucesso){
                filipetaVirtual1(papeleta.processo);
            } 
            else {
                $("#resultado").html(`<div class="alert alert-warning" style="width: 35rem;" role="alert">
                                        <strong>OCORREU UM PROBLEMA.</strong> <small>Tente novamente inserir os dados.</small>
                                      </div>`);
                setTimeout(function() {$("#resultado").html("");}, 3000);
            }
        })
       .fail(function(jqXHR, textStatus, response){
            alert(response);
       });
    }    
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
			preenche(papeleta.requerente.length, papeleta.requerente);
            break;
        case 2:
            preenche(papeleta.adv_requerente.length, papeleta.adv_requerente);
            break;
        case 3:
            preenche(papeleta.requerido.length, papeleta.requerido);
            break;
        case 4:
            preenche(papeleta.adv_requerido.length, papeleta.adv_requerido);            
            break;    
        default:
            break;
    }
	function preenche(lim, valor) {
		for (let i=0; i < lim; i++){
                outputP8 += `<div>${valor[i]}</div>`;
                outputP4 += `<div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions${i}" id="inlineRadio1${i}" value="${lim}${num}${i}1">
                                <label class="form-check-label" for="inlineRadio1${i}"><b><small>PRESENÇA</small></b></label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions${i}" id="inlineRadio2${i}" value="${lim}${num}${i}0">
                                <label class="form-check-label" for="inlineRadio2${i}"><b><small>AUSÊNCIA</small></b></label>
                            </div>`;
            }
        $("#papeletaVirtual1").html(outputP8);
        $("#papeletaVirtual2").html(outputP4);
    }    
}

function papeletaCompleta() {
    $("#genericModal").modal("show");
    $("#genericModalLabel").html("Audiência Completa");
    $("#genericModalCorpo").html("A Audiência selecionada já está completa ?");
    $("#rodapeModalGeral").html(`<button type="button" class="btn btn-outline-success" onclick="updateCompleta(1)"><b>SIM</b></button>
                                <button type="button" class="btn btn-outline-danger" onclick="updateCompleta(0)"><b>NÃO</b></button>`);
}

function adicionaParte(tabela) {
    let nome1 = "";
    let dadosDB = {
        tabelaDB: "",
        colunaDB: ""
    };
    switch (tabela) {
        case 1:
            nome1 = "REQUERENTE";
            dadosDB.tabelaDB = "requerentes";
            dadosDB.colunaDB = "requerente";
            break;
        case 2:
            nome1 = "Advogado do Requerente"
            dadosDB.tabelaDB = "requerente_advs";
            dadosDB.colunaDB = "advogado";
            break;
        case 3:
            nome1 = "Requerido"
            dadosDB.tabelaDB = "requeridos";
            dadosDB.colunaDB = "requerido";
            break;
        case 4:
            nome1 = "Advogado do Requerido"
            dadosDB.tabelaDB = "requerido_advs";
            dadosDB.colunaDB = "advogado";
            break;
    
        default:
            break;
    }
    $("#genericModal").modal("show");
    $("#genericModalLabel").html("Registro de Participante");    
    $("#genericModalCorpo").html(`<label for="geralEntradaParte" class="form-label">${nome1}</label>
                                <input class="form-control" type="text" id="geralEntradaParte" placeholder="Dados da Parte" aria-label="geralEntradaParte"></input>`);
    $("#rodapeModalGeral").html(`<button type="button" class="btn btn-outline-success" id="saveButton" data-dados='${JSON.stringify(dadosDB)}' onclick="insertNewPart()"><b>SALVA</b></button>
                                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" onclick=""><b>CANCELA</b></button>`);
}

//fechado parcialmente 16/08/2024
