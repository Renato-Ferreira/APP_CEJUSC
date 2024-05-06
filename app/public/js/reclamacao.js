$( () => {

    $("#btnEprocesso").click( (event) => {
        formataProcesso($("#numProcesso").val());
        
    });
    $("#btnconfirmaEprocesso").click( (event) => {
        $("#numProcesso").val(processoFormat);
        $("#titulo1").html("PROCESSO: " + processoFormat + "<small><i> (selecionado)</small></i>");
        
    }); 

    $("#btnEagendar").click( (event) => {
        $("#resultado-agendar").html("PROCESSO: " + $("#numProcesso").val() + "</br>Data: " + $("#data").val() + "</br>Sala: " + $("#sala-inputGroupSelect").val() + "</br>Hora: " + $("#hora").val());
        
    });

    $("#reclamante-list").click( (event) => {
        setPainel("Reclamante");
        $("#rotulo-num").html("Número de reclamantes");
        $("#op1").html("1 RECLAMANTE");
        for (let i=2; i<=5; i++){
            $(`#op${i}`).html(i + " RECLAMANTES");
        };
        
    });

    $("#reclamado-list").click( (event) => {
        setPainel("Reclamado");
        $("#rotulo-num").html("Número de reclamados");
        $("#op1").html("1 RECLAMADO");
        for (let i=2; i<=5; i++){
            $(`#op${i}`).html(i + " RECLAMADOS");
        };
        
    });

    $("#advogado-list").click( (event) => {
        setPainel("Advogado");
        $("#rotulo-num").html("Número de advogados");
        $("#op1").html("1 ADVOGADO");
        for (let i=2; i<=5; i++){
            $(`#op${i}`).html(i + " ADVOGADOS");
        };
        
    });

    $("#menor-list").click( (event) => {
        setPainel("Menor");
        $("#rotulo-num").html("Número de menores");
        $("#op1").html("1 MENOR");
        for (let i=2; i<=5; i++){
            $(`#op${i}`).html(i + " MENORES");
        };
        
    });

});

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
    $("#conteudoModal").html("Você confirma " + processoFormat + " ?");
    //return processo.replace(/(\d{7})(\d{2})(\d{4})/, "$1-$2.$3");//realiza a formatação com a máscara
};

//função responsável por preparar o painel de entrada de dados
var tipo = "";
function setPainel(parte){
    tipo = parte;
    $("#painel-inputGroupSelect").val("0");
    caixaInput(null);
    resumo(null);
};

//função [caixaInput(int)], onde: (int: número de caixas de input)
function caixaInput(num){
    let caixaTxt = "";
    for (let i=1; i <= num; i++) {
        idVariavel = "nome" + i;
        caixaTxt = caixaTxt + `<div class="input-group mt-4"><input type="text" class="form-control" placeholder="Nome" id="${idVariavel}"></div>`;
    };
    $("#entradaPainel").html(caixaTxt);
};

//função [resumo(int)], onde: (int: número de entradas)
function resumo(num){
    let nomeR = "";
    for (let i=1; i <= num; i++) {
        idVariavel = "nome" + i;
        nomeR = nomeR + "Nome: " + $(`#${idVariavel}`).val() + "</br>";
    };
    $("#resultado-painel").html(nomeR);
    $("#r").html(`<small>Aguardando entrada de dados: <b>${tipo}</b></small>`);
};
//fechado 24/06/2020