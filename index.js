$(document).ready(function() {
    
    if (localStorage.getItem('loginSalvo') != null) {
        sessionStorage.setItem('login', localStorage.getItem('loginSalvo'));
    }

    $('#botao-conta').on('click', () => {
        if (sessionStorage.getItem('login') == null) {
            location.href = 'login.html';
            return;
        }
        location.href = 'conta.html';
    });

    let produtos = JSON.parse(localStorage.getItem('produtos'));
    if (produtos != null) {
        for (let i = 0; i < produtos.length; ++i) {
            $('.produto .nome')[i].innerHTML = produtos[i].nome;
            $('.produto .imagem')[i].src = produtos[i].img;
            $('.produto .preco span')[i].innerHTML = produtos[i].preco;

            if (i == 0) {
                let randomPrice = 0;
                const precoFloat = parseFloat(produtos[i].preco);
                do {
                    randomPrice = Math.random() * precoFloat * 3;
                } while (randomPrice < precoFloat);

                $('.preco-original span').text(randomPrice.toFixed(2).toString().replace('.', ','));
                $('.desconto .valor').text(100 - (Math.floor((precoFloat / randomPrice) * 100)));
                $('.produto .nome')[i].innerHTML = produtos[i].nome.toUpperCase();
            }
        }
    }

    var cbOpened = false;
    const cbBtn = $('.chatbot');
    const cbCurr = $('#chatbot-current');
    const cbChat = $('.chatbot-chat');

    $(document).on('click', (e) => {
        const chat = $('.chatbot-chat')[0];
        const isClickInside = chat.contains(e.target);
        if (!isClickInside && cbOpened) {
            cbBtn.trigger('click');
        }
    });

    cbBtn.on('click', (e) => {
        // impede a propagação do evento de clique
        // (evitar que o chat se feche sozinho)
        e.stopPropagation();

        let path = './Imagens/IconesSite/chatbot.svg';
        const time = 150; // duração da animação, em milissegundos.

        cbOpened = !cbOpened;
        if (cbOpened) {
            path = './Imagens/IconesSite/chatbotselecionado.svg';
            cbChat.slideDown(time);
        } else {
            cbChat.slideUp(time);
        }
        
        // troca a imagem
        $('#chatbot-below').attr('src', path);
        cbCurr.fadeOut(time, () => {
            cbCurr.attr('src', path);
            cbCurr.fadeIn(0);
        });

        // ativa ou desativa o chat
        cbChat.attr('data-chat-open', `${cbOpened}`);
    });

    const hasLetter = (txt) => {
        return /[a-ç0-9]/i.test(txt);
    }

    const enviarMensagem = (msg, sender = 0) => {
        // sender -> 0 = cliente, 1 = suporte
        const msgClass = sender == 0 ? 'cliente' : 'suporte',
              numMsgSuporte = $('.suporte').length;

        // Se já tiver uma mensagem de erro
        if (sender == 1 && numMsgSuporte != 1) return;
        
        // se a mensagem for vazia, sair da função
        if (msg === undefined) return;
        if (!hasLetter(msg)) { $('.enviar-mensagem #digitar').val(''); return; }

        const container = $('.mensagens');
        
        // criar o elemento de mensagem
        const element = $('<p></p>').addClass(msgClass).text(msg);
        
        // colocar ele no documento
        container.append(element);

        if (sender == 0) {
            element.css({opacity: 0, marginRight: 0});
            element.animate({
                opacity: 1,
                marginRight: 10
            }, {duration: 150});
        } else {
            element.css({opacity: 0, marginLeft: 0});
            element.animate({
                opacity: 1,
                marginLeft: 10
            }, {duration: 150});
        }

        // colocar uma quebra para que a próxima mensagem
        // não fique do lado da atual
        const clear = $('<div></div>').addClass('clear');
        container.append(clear);

        // limpar a caixa de texto
        $('.enviar-mensagem #digitar').val('');

        if (numMsgSuporte == 1) {
            setTimeout(enviarMensagem, 500, 'Desculpe, o suporte não está disponível no momento.', 1);
        }
    }

    const chatInput = $('.enviar-mensagem #digitar'),
          chatSend = $('.enviar-mensagem #enviar');
    
    chatInput.on('keyup', (e) => {
        if (e.key === 'Enter' || e.keycode === 13) {
            enviarMensagem(chatInput.val());
        }
    });

    chatSend.on('click', () => {
        enviarMensagem(chatInput.val());
    });

    $('#input-header').on('keyup', (e) => {
        if (e.key === 'Enter' || e.keycode === 13) {
            location.href = 'WIP.html';
        }
    });

    $('#lupa-header').on('click', () => {
        location.href = 'WIP.html';
    });

    $('#search-footer').on('keyup', (e) => {
        if (e.key === 'Enter' || e.keycode === 13) {
            location.href = 'WIP.html';
        }
    });

    $('#lupa-footer').on('click', () => {
        location.href = 'WIP.html';
    });
});

// se a imagem não carregar, trocar pelo placeholder
function imgError(img) {
    img.onerror = '';
    img.src = './Imagens/IconesSite/produtoindisponivel.svg';
}