$(document).ready(function() {
    $('#formPartida').on('submit', function(e) {
        let valido = true;
        let mensagens = [];

        // 1. Validação de campos de texto
        if ($('#timeCasa').val().trim() === "" || $('#timeVisitante').val().trim() === "") {
            mensagens.append("Os nomes dos times são obrigatórios.");
            valido = false;
        }

        // 2. Validação de Placar (verificar se preencheu)
        if ($('input[name="golsCasa"]').val() === "" || $('input[name="golsVisitante"]').val() === "") {
            mensagens.append("Informe o placar da partida.");
            valido = false;
        }

        // 3. Validação de Radio (Local)
        if ($('input[name="local"]:checked').length === 0) {
            mensagens.append("Selecione o local onde ocorreu a partida.");
            valido = false;
        }

        // 4. Validação de Grupo de Checkboxes (Mínimo 2 destaques)
        if ($('input[name="destaques"]:checked').length < 2) {
            mensagens.append("Selecione pelo menos 2 destaques da partida.");
            valido = false;
        }

        // 5. Validação de Checkbox única (Termo)
        if (!$('input[name="termoVeracidade"]').is(':checked')) {
            mensagens.append("Você deve confirmar a veracidade dos dados.");
            valido = false;
        }

        // Finalização
        if (!valido) {
            e.preventDefault(); // Impede o envio
            alert("Erros encontrados:\n\n- " + mensagens.join("\n- "));
        } else {
            alert("Partida registrada com sucesso!");
        }
    });
});