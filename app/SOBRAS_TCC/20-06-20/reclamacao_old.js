$( () => {

    $("#btnEprocesso").click( (event) => {
        $("#titulo1").html("PROCESSO: " + $("#numProcesso").val() + "<small><i> (selecionado)</small></i>");
        
    }); 

    $("#btnEagendar").click( (event) => {
        $("#resultado-agendar").html("PROCESSO: " + $("#numProcesso").val() + "</br>Data: " + $("#data").val() + "</br>Sala: " + $("#sala-inputGroupSelect").val() + "</br>Hora: " + $("#hora").val());
        
    });

    $("#btnEnumreclamante").click( (event) => {
        let caixaTxt = "";
        for (let i=1; i <= $("#reclamante-inputGroupSelect").val(); i++) {
            caixaTxt = caixaTxt + `<div class="input-group mt-4"><input type="text" class="form-control" placeholder="Nome" id="nome${i}"></div>`;
        }
        $("#entradaReclamante").html(caixaTxt);
    });

    $("#btnEreclamante").click( (event) => {
        let nomeR = "";
        for (let i=1; i <= $("#reclamante-inputGroupSelect").val(); i++) {
            nomeR = nomeR + "Reclamante: " + $(`#nome${i}`).val() + "</br>";
        }
        $("#resultado-reclamante").html(nomeR);
    });

    $("#btnEnumreclamado").click( (event) => {
        let caixaTxt = "";
        for (let i=1; i <= $("#reclamado-inputGroupSelect").val(); i++) {
            caixaTxt = caixaTxt + `<div class="input-group mt-4"><input type="text" class="form-control" placeholder="Nome" id="nomeRmdo${i}"></div>`;
        }
        $("#entradaReclamado").html(caixaTxt);
    });

    $("#btnEreclamado").click( (event) => {
        let nomeR = "";
        for (let i=1; i <= $("#reclamado-inputGroupSelect").val(); i++) {
            nomeR = nomeR + "Reclamado: " + $(`#nomeRmdo${i}`).val() + "</br>";
        }
        $("#resultado-reclamado").html(nomeR);
    });


});