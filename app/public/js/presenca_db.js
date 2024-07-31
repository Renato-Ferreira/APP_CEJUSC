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
                    <div class="card-header"><b>FILIPETA</b></div>
                    <div class="card-body text-success">
                        <p class="card-text" id="filipetaSpan">
                            <span><b>PROCESSO:</b> ${response.filipeta.processo}</span>
                            <span><b>ASSUNTO:</b> ${response.filipeta.assunto}</span>
                            <span><b>DATA:</b> ${response.filipeta.data}</span>
                            <span><b>HORÁRIO:</b> ${response.filipeta.horario}</span>
                            <span><b>SALA:</b> ${response.filipeta.sala}</span>
                        </p>
                        <p class="card-text"><b>REQUERENTE: </b>`;                        
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


//fechado parcialmente 26/07/2024
