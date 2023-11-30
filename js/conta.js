$(document).ready(function () {
    //localStorage.clear();

    const accountData = JSON.parse(sessionStorage.getItem('login'));

    if (accountData.tipo != 'admin') { $('.admin').css('display', 'none'); }

    $('#email').text(accountData.email);
    $('#cpf').text(accountData.cpf);


    $('#apagar-dados').on('click', () => {
        sessionStorage.clear();
        localStorage.clear();
        location.href = 'login.html';
    });

    $('#apagar-conta').on('click', () => {
        const allData = JSON.parse(localStorage.getItem('credenciais')),
              currAcc = accountData,
              dataPos = allData.map(e => e.email).indexOf(currAcc.email);
        
        let newData = allData;
        if (dataPos > -1) { newData.splice(dataPos, 1); }
        localStorage.setItem('credenciais', JSON.stringify(newData));
        location.href = 'index.html';
    });

    $('#deslogar').on('click', () => {
        localStorage.removeItem('loginSalvo');
        sessionStorage.removeItem('login');
        location.href = 'index.html';
    });
});