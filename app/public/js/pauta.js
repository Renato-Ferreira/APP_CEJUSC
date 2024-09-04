$( () => {

    $("#pautaDiaria").on("click", function() {
        pautaDia(5, '08/05/2024');
        /*let dateBD = datAgora();
        console.log(dateBD);*/
    });

    $("#printPage").on("click", function() {
        let opt = 0;
        $("#prntModal").modal("show");       
        
         // Remove os manipuladores de eventos anteriores
         $('input[name="inlineRadioOptions"]').off('change');
         $("#imprimeBtn").off('click');

        $('input[name="inlineRadioOptions"]').on('change', function() {
            // Captura o valor do botão de rádio selecionado
            let selectedValue = $('input[name="inlineRadioOptions"]:checked').val();
            //console.log("Selected value: " + selectedValue);
            opt = parseInt(selectedValue, 10);
            //console.log("Parse: ", opt);
        });
        $("#imprimeBtn").on("click", function() {
            $("#prntModal").modal("hide");
            $("#resultado_pauta_superior_1").html("...");
            $("#resultado_pauta_superior_2").html("...");
            $("#resultado_pauta_inferior_1").html("...");
            $("#resultado_pauta_inferior_2").html("...");
            pautaDia(opt, '08/05/2024');
            setTimeout(() => {
                imprimirPorSala();
            }, 1000);
        });      
    });

    $("#pautaData").on("click", function() {
        $("#dataModal").modal("show");
        $("#escolheData").on("click", function() {
            $("#dataModal").modal("hide");
            $("#resultado_pauta_superior_1").html("...");
            $("#resultado_pauta_superior_2").html("...");
            $("#resultado_pauta_inferior_1").html("...");
            $("#resultado_pauta_inferior_2").html("...");
            let dataInput = $("#data").val();
            let dataPartes = dataInput.split('-');
            let dataFormatada = `${dataPartes[2]}/${dataPartes[1]}/${dataPartes[0]}`;
            pautaDia(5, dataFormatada);
        });
    });

});

//--------------------------------------------------------------------------------------
/*function imprimirPorSala(){
    var printContents = $('#resultado_pauta_superior_1').html();
    var originalContents = $('body').html();
    $('body').html('<html><head><title>Imprimir</title></head><body>' + printContents + '</body></html>');
    window.print();
    $('body').html(originalContents);
}*/

function imprimirPorSala() {
    var printContents = $('#resultado_pauta_superior_1').html();
    
    // Abre uma nova janela para imprimir
    var printWindow = window.open('', '_blank', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Imprimir</title></head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus(); // Garante que a janela de impressão está em foco
    printWindow.print();
    printWindow.close();
}

/*function imprimirPorSala() {
    var printContents = $('#resultado_pauta_superior_1').html();
    var originalContents = $('#resultado_pauta_superior_1').clone(); // Clona o conteúdo original
    
    // Cria uma nova janela para impressão
    var printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Imprimir</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();

    // Restaura o conteúdo original (se necessário)
    $('#resultado_pauta_superior_1').html(originalContents.html());
}*/

function datAgora() {
    let ts = Date.now();
	let date_ob = new Date(ts);
	let dataOutput = "";
    if(`${date_ob.getDate()}` < 10) {
        dataOutput += `0${date_ob.getDate()}/`;
    }
    else {
        dataOutput += `${date_ob.getDate()}/`;
    }
    if(`${date_ob.getMonth()}` < 9) {
        dataOutput += `0${(date_ob.getMonth() + 1)}/${date_ob.getFullYear()}`;
    }
    else {
        dataOutput += `${(date_ob.getMonth() + 1)}/${date_ob.getFullYear()}`;
    }
    return (dataOutput);
}