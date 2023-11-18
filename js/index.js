$(document).ready(function() {
    // chatbot botão
    var cbOpened = false;
    let cbBtn = $('.chatbot');
    let cbCurr = $('#chatbot-current');
    let cbBelow = $('#chatbot-below');

    cbBtn.click(() => {
        // alterna a boolean
        cbOpened = !cbOpened;
        
        // pega a imagem que deve ser trocada
        let selectedPath;
        let time = 250; // duração da animação, em milissegundos.
        if (cbOpened) {
            selectedPath = './Imagens/IconesSite/chatbotselecionado.svg';
        } else {
            selectedPath = './Imagens/IconesSite/chatbot.svg';
        }
        
        // troca a imagem
        cbBelow.attr('src', selectedPath);
        cbCurr.fadeOut(time, () => {
            cbCurr.attr('src', selectedPath);
            cbCurr.fadeIn(0);
        });
    });
});

// se a imagem não carregar, trocar pelo placeholder
function imgError(img) {
    img.onerror = '';
    img.src = './Imagens/IconesSite/produtoindisponivel.svg'
}