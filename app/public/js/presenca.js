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
    
});

function minhaFuncao() {
    // Usa jQuery para acionar o modal
    $('#exampleModal').modal('show');
}



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
