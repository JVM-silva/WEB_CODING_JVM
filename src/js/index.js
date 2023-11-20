$(document).ready(function() {
    // chatbot botão
    var cbOpened = false;
    const cbBtn = $('.chatbot');
    const cbCurr = $('#chatbot-current');
    const cbChat = $('.chatbot-chat');

    $(document).on('click', e => {
        const chat = $('.chatbot-chat')[0];
        const isClickInside = chat.contains(e.target);
        if (!isClickInside && cbOpened) {
            cbBtn.trigger('click');
        }
    });

    cbBtn.on('click', e => {

        // impede a propagação do evento de clique
        // (evitar que o chat se feche sozinho)
        e.stopPropagation();

        // alterna a boolean
        cbOpened = !cbOpened;
        
        // pega a imagem que deve ser trocada
        let selectedPath = './Imagens/IconesSite/chatbot.svg';
        const time = 150; // duração da animação, em milissegundos.
        if (cbOpened) {
            selectedPath = './Imagens/IconesSite/chatbotselecionado.svg';
            cbChat.slideDown(time);
        } else {
            cbChat.slideUp(time);
        }
        
        // troca a imagem
        $('#chatbot-below').attr('src', selectedPath);
        cbCurr.fadeOut(time, () => {
            cbCurr.attr('src', selectedPath);
            cbCurr.fadeIn(0);
        });

        // ativa ou desativa o chat
        cbChat.attr('data-chat-open', `${cbOpened}`);
    });

    const hasLetter = txt => {
        return /[a-ç0-9]/i.test(txt);
    }

    const enviarMensagem = msg => {
        // se a mensagem for vazia, sair da função
        if (msg === undefined || !hasLetter(msg)) return;

        const container = $('.mensagens');
        
        // criar o elemento de mensagem
        const element = $('<p></p>').addClass('cliente').text(msg);
        
        // colocar ele no documento
        container.append(element);
        element.css({opacity: 0, marginRight: 0});
        element.animate({
            opacity: 1,
            marginRight: 10
        }, {duration: 150});

        // colocar uma quebra para que a próxima mensagem
        // não fique do lado da atual
        const clear = $('<div></div>').addClass('clear');
        container.append(clear);

        // limpar a caixa de texto
        $('.enviar-mensagem #digitar').val('');
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
});

// se a imagem não carregar, trocar pelo placeholder
function imgError(img) {
    img.onerror = '';
    img.src = './Imagens/IconesSite/produtoindisponivel.svg';
}