$( () => { 

    $("#printPage").on("click", function() {
        let opt;
        $("#prntModal").modal("show");
        $('input[name="inlineRadioOptions"]').on('change', function() {
            // Captura o valor do botão de rádio selecionado
            let selectedValue = $('input[name="inlineRadioOptions"]:checked').val();
            console.log("Selected value: " + selectedValue);
            opt = parseInt(selectedValue, 10);
            console.log("Parse: ", opt);
        });
        $("#imprimeBtn").on("click", function() {
            pautaDia(opt);
        });

       /* var printContents = $('#resultado_pauta').html();
        var originalContents = $('body').html();

        $('body').html('<html><head><title>Imprimir</title></head><body>' + printContents + '</body></html>');
        window.print();
        $('body').html(originalContents);*/
    });

});