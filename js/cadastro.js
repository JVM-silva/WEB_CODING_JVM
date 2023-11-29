$(document).ready(function () {
    const email = $('#email'),
          cpf = $('#cpf'),
          senha = $('#password'),
          confSenha = $('#confirm-password'),
          btnSubmit = $('#botao-login'),
          alreadyExists = $('#already-exists');


    const hasLetter = (txt) => {
        return /[a-ç0-9]/i.test(txt);
    }

    btnSubmit.on('click', (e) => {
        e.preventDefault();

        alreadyExists.css('display', 'none');
        let isInvalid = false;
        // checa se algum campo está vazio
        $('#info-cadastro').children('input').each((i, element) => {
            const txt = $(element).val();

            if (!hasLetter(txt)) {
                $(element).css('border', '3px solid var(--vermelho)');
                isInvalid = true;
            }
        });
        if (isInvalid) return;

        // checa se a senha está correta
        if (senha.val() != confSenha.val()) {
            confSenha.css('border', '3px solid var(--vermelho)');
            return;
        }

        // checa se já há um cadastro com o mesmo e-mail
        const cadastros = localStorage.getItem('email');
        let lstEmails = [],
            lstSenhas = [];

        if (cadastros != null) {
            lstEmails = JSON.parse(cadastros);
            
            for (let v of arr) {
                if (email.val() == v) {
                    alreadyExists.css('display', 'inline-block');
                    return;
                }
            }
        }
        lstEmails.push(email.val());
        lstSenhas.push(senha.val());
        localStorage.setItem('email', JSON.stringify(lstEmails));
        localStorage.setItem('senha', JSON.stringify(lstSenhas));
    });
});