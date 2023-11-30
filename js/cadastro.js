$(document).ready(function () {
    const borderRed = getComputedStyle(document.body).getPropertyValue('--vermelho'),
          borderGreen = getComputedStyle(document.body).getPropertyValue('--verde');

    const hasLetter = (txt) => {
        return /[a-ç0-9]/i.test(txt);
    }

    const showError = (str) => {
        $('#error').text(str);
        $('#error').css('display', 'block');
    }
    
    // fonte: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    const rgbToHex = (rgb) => {
        const rgbArr = rgb.substring(4, rgb.length-1)
                          .replace(/ /g, '')
                          .split(','),
              r = rgbArr[0],
              g = rgbArr[1],
              b = rgbArr[2];
        
         return ('#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)).toUpperCase();
    }

    $('#botao-login').on('click', () => {
        $('#form-cadastro input').trigger('click');

        let invalid = false,
            dados = [];

        $('#form-cadastro input').each((i, e) => {
            $e = $(e);
            if (!hasLetter($e.val())) {
                $e.css('border-color', borderRed);
                invalid = true;
            }
        });
        if (invalid) {
            showError('Por favor, preencha os campos obrigatórios');
            return;
        }

        if ($('#password').val() != $('#confirm-password').val()) {
            showError('Verifique se a senha está correta');
            $('#confirm-password').css('border-color', borderRed);
            return;
        }

        if (localStorage.getItem('credenciais') != null) {
            dados = JSON.parse(localStorage.getItem('credenciais'));
            
            for (x in dados) {
                if (dados[x].email == $('#email').val()) {
                    showError('Já existe uma conta neste e-mail.');
                    $('#email').css('border-color', borderRed);
                    return;
                }
            }
        }

        const dadosObj = {
            'email': $('#email').val(),
            'cpf': $('#cpf').val(),
            'senha': $('#password').val(),
            'tipo': 'usuario'
        };
        dados.push(dadosObj);
        localStorage.setItem('credenciais', JSON.stringify(dados));
        location.href = 'login.html';
    });

    $('#form-cadastro input').each((i, e) => {
        $(e).on('click', () => {
            if (rgbToHex($(e).css('border-color')) == borderRed) {
                $('#error').css('display', 'none');
                $(e).css('border-color', borderGreen);
            }
        });
    });
});