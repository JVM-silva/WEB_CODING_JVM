$(document).ready(function () {
    
    const hasLetter = (txt) => {
        return /[a-ç0-9]/i.test(txt);
    }

    const showError = (str) => {
        $('#error').text(str);
        $('#error').css('display', 'block');
    }
    

    $('#botao-login').on('click', () => {
        $('#form-cadastro input').trigger('click');

        let invalid = false;

        $('#form-cadastro input').each((i, e) => {
            $e = $(e);
            if (!hasLetter($e.val())) {
                $e.css('border', '3px solid var(--vermelho)');
                invalid = true;
            }
        });
        if (invalid) {
            showError('Por favor, preencha os campos obrigatórios');
            return;
        }

        if ($('#password').val() != $('#confirm-password').val()) {
            showError('Verifique se a senha está correta');
            $('#confirm-password').css('border', '3px solid var(--vermelho)');
            return;
        }

        let dados = [];
        if (localStorage.getItem('credenciais') != null) {
            dados = JSON.parse(localStorage.getItem('credenciais'));
        }

        const dadosObj = {
            'email': $('#email').val(),
            'cpf': $('#cpf').val(),
            'senha': $('#password').val()
        };
        dados.push(dadosObj);
        localStorage.setItem('credenciais', JSON.stringify(dados));
        location.href = 'login.html';
    });

    $('#form-cadastro input').each((i, e) => {
        $(e).on('click', () => {
            if ($(e).css('border') === '3px solid var(--vermelho)') {
                $('#error').css('display', 'none');
                $(e).css('border', '3px solid var(--verde)');
            }
        });
    });
});