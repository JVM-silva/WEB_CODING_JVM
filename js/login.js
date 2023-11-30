$(document).ready(function () {
    const borderRed = getComputedStyle(document.body).getPropertyValue('--vermelho'),
          borderGreen = getComputedStyle(document.body).getPropertyValue('--verde');

    // fonte: // fonte: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    const rgbToHex = (rgb) => {
        const rgbArr = rgb.substring(4, rgb.length-1)
                          .replace(/ /g, '')
                          .split(','),
              r = rgbArr[0],
              g = rgbArr[1],
              b = rgbArr[2];
        
         return ('#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)).toUpperCase();
    }

    const hasLetter = (s) => {
        return /[a-ç0-9]/i.test(s)
    }

    const showError = (str) => {
        $('#error').text(str);
        $('#error').css('display', 'block');
    }

    $('#botao-login').on('click', () => {
        if (!hasLetter($('#email').val())) {
            showError('Insira um e-mail');
            $('#email').css('border-color', borderRed);
            return;
        }
        if (!hasLetter($('#senha').val())) {
            showError('Insira uma senha');
            $('#senha').css('border-color', borderRed);
            return;
        }

        const dados = JSON.parse(localStorage.getItem('credenciais'));
        let valid = false;

        for (x in dados) {
            if (dados[x].email == $('#email').val()) {
                if (dados[x].senha == $('#senha').val()) {
                    valid = true;
                    if ($('#lembrar')[0].checked) {
                        localStorage.setItem('loginSalvo', JSON.stringify(dados[x]));
                    }
                    sessionStorage.setItem('login', JSON.stringify(dados[x]));
                    break;
                }
            }
        }

        if (!valid) {
            showError('E-mail ou senha incorretos');
            return;
        }

        location.href = 'index.html';
    });

    $('#form-login input').each((i, e) => {
        $(e).on('click', () => {
            if (rgbToHex($(e).css('border-color')) == borderRed) {
                $('#error').css('display', 'none');
                $(e).css('border-color', borderGreen);
            }
        });
    });
});