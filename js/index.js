$(document).ready(function() {
    
    // chatbot botão
    let chatbot = false;
    const chatbotButton = $('.chatbot');
    chatbotButton.on('click', function() {
        chatbot = !chatbot;
        const chatbotOpen = $("#chatbot-open");
        const chatbotClosed = $("#chatbot-closed");

        if (chatbot) {
            chatbotClosed.css('display', 'none');
            chatbotOpen.css('display', 'inline');
        } else {
            chatbotOpen.css('display', 'none');
            chatbotClosed.css('display', 'inline');
        }
    })
});