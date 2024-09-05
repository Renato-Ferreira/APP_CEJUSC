$( () => {
    var selectedValue = "";

    
    $('#campoBuscaPresenca').on("change", function() {

        $("#dadosBuscaPresenca").val("");
        selectedValue = $(this).val();       
        //console.log("Valor selecionado: " + selectedValue);        
        if(selectedValue === "Selecione para Consulta") {            
            $("#orientacaoBusca").html("");
        } else if(selectedValue === "1") {            
            $("#orientacaoBusca").html("Ex.: 0000123.45-2024");
        } else{            
            $("#orientacaoBusca").html("Ex.: René Descartes");
        }   
             
    })
    .trigger("change");


    $("#btnConfirmaPresenca").on("click", function() {
        if(selectedValue === "Selecione para Consulta") {
            $("#resultado").html(`<div class="alert alert-warning" style="width: 35rem;" role="alert">
                                    <strong>A T E N Ç Ã O  !</strong> Você deve selecionar uma opção para pesquisa.
                                  </div>`);
            setTimeout(function() {$("#resultado").html("");}, 3000);
        }
        else if(selectedValue === "1") {
            let formattedProcess = formataProcesso($("#dadosBuscaPresenca").val());
            $("#dadosBuscaPresenca").val(formattedProcess);
            filipetaVirtual1(formattedProcess);
        }
        else {
            let nome = `%` + $("#dadosBuscaPresenca").val() + `%`;
            filipetaVirtual2(nome);
        }
    });

    // Previne o envio do formulário ao pressionar a tecla Enter
    $('#formBuscaPresenca').on('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });

    $("#btnRegistraPresenca").on("click",function() {
        let codUpdate = [];
        for (let i = 0; i < (parseInt($(`input[name="inlineRadioOptions0"`).val().slice(0,1))); i++) {
            if ($(`input[name="inlineRadioOptions${i}"]:checked`).val()) {
                codUpdate.push($(`input[name="inlineRadioOptions${i}"]:checked`).val());
            }            
        }
        $('#papeletaModal').modal('hide');
        atualizaPresenca({processo: $("#dadosBuscaPresenca").val(), codUpdate});
    });

    $("#btnAddParte").on("click", function() {
        if($(`input[name="inlineRadioOptions0"`).val()) {
            let tabela = parseInt($(`input[name="inlineRadioOptions0"`).val().slice(1,2));
            console.log("tabela: ", tabela);
            $('#papeletaModal').modal('hide');
            adicionaParte(tabela);
        }
        else {
            let tab = 0;
            $('#papeletaModal').modal('hide');
            $("#genericModal").modal("show");
            $("#genericModalLabel").html("Seleção de Tipo de Participante");
            $("#genericModalCorpo").html(`<select class="form-select" aria-label="auxilioTabela" id="auxilioTabela">
                                            <option selected>Abra este menu de seleção</option>
                                            <option value="1">Requerente</option>
                                            <option value="2">Advogado do Requerente</option>
                                            <option value="3">Requerido</option>
                                            <option value="4">Advogado do Requerido</option>
                                        </select>`);
                                        $("#rodapeModalGeral").html(`<button type="button" class="btn btn-outline-success" id="btnAuxilioTabela"><b>ENVIA</b></button>
                                        <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal"><b>CANCELA</b></button>`);
            $("#auxilioTabela").on("change", function() {
                tab = parseInt($(this).val(), 10);                
            });
            $("#btnAuxilioTabela").on("click", function() { 
                adicionaParte(tab);
            })
        }
        
    });
    
});


function formataProcesso(processo){
    processo = processo.replace(/[^\d]/g, "");//retira os caracteres indesejados
    //ajusta o tamanho
    if (processo.length < 13){
        let lim = 13 - processo.length;
        for (let i=1; i<=lim; i++){
            processo = "0" + processo;
        }
    }
    if (processo.length > 13){
        let i = processo.length - 13;
        processo = processo.slice(i);
    }
    return processo.replace(/(\d{7})(\d{2})(\d{4})/, "$1-$2.$3");       
}
