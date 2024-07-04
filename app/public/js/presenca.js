$( () => {
    
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
            $("#resultado").html(`<div class="col-auto">
                                    <div class="alert alert-warning" role="alert">
                                        <strong>A T E N Ç Ã O  !</strong> Você deve selecionar uma opção para pesquisa.
                                    </div>
                                  </div>
                                `);
            setTimeout(function() {
                $("#resultado").html("");
            }, 2500);
        } else if(selectedValue === "1") {
            formataProcesso($("#dadosBuscaPresenca").val());
            $("#dadosBuscaPresenca").val(processoFormat);
        }
    });
    
});

var selectedValue = "";
var processoFormat = "";
function formataProcesso(processo){
    processo = processo.replace(/[^\d]/g, "");//retira os caracteres indesejados
    //ajusta o tamanho
    if (processo.length < 13){
        let lim = 13 - processo.length;
        for (let i=1; i<=lim; i++){
            processo = "0" + processo;
        };
    };
    if (processo.length > 13){
        let i = processo.length - 13;
        processo = processo.slice(i);
    };
    processoFormat = processo.replace(/(\d{7})(\d{2})(\d{4})/, "$1-$2.$3");       
};