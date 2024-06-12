$( () => {

    $('#select_presenca').on("change", function() {
        var selectedValue = $(this).val();
        console.log("Valor selecionado: " + selectedValue);
        // Aqui você pode adicionar a lógica que desejar
    })
    .trigger("change");

});

