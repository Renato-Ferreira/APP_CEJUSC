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
                        <p class="card-text"><a href="#" class="custom-link" onclick="minhaFuncao()"><b>REQUERENTE: </b></a>`; 
            for (let i = 0; i < response.filipeta.requerente.length; i++) {
                output += `${response.filipeta.requerente[i]}; `;
            }
            output += `<br>
						<span><b>ADVOGADO do REQUERENTE: </b>`; 
            
            for (let i = 0; i < response.filipeta.adv_requerente.length; i++) {
                output += `${response.filipeta.adv_requerente[i]}; `;
            }
            output += `</span>
                        </p>
                        <p class="card-text"><b>REQUERIDO: </b>`;                        
            for (let i = 0; i < response.filipeta.requerido.length; i++) {
                output += `${response.filipeta.requerido[i]}; `;
            }
            output += `<br>
						<span><b>ADVOGADO do REQUERIDO: </b>`; 
            
            for (let i = 0; i < response.filipeta.adv_requerido.length; i++) {
                output += `${response.filipeta.adv_requerido[i]}; `;
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

//fechado parcialmente 31/07/2024
