$(document).ready(function () {
    $('#deslogar').on('click', () => {
        localStorage.removeItem('loginSalvo');
        sessionStorage.removeItem('login');
        location.href = 'index.html';
    });
});