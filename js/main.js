const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
    modal.classList.toggle("is-open");
}

//day1

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('gloDelivery');

function toogleModalAuth() {
    modalAuth.classList.toggle('is-open');
}


function autorized() {

    function logOut() {
        login = null;

        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';
        buttonOut.removeEventListener('click', logOut);
        localStorage.removeItem('gloDelivery');
        checkAuth();
    }

    userName.textContent = login;
    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'block';

    buttonOut.addEventListener('click', logOut);

}

function logIn(event) {

    event.preventDefault();
    if (loginInput.value.trim()) {
        login = loginInput.value;
        localStorage.setItem('gloDelivery', login);
        toogleModalAuth();
        buttonAuth.removeEventListener('click', toogleModalAuth);
        closeAuth.removeEventListener('click', toogleModalAuth);
        loginForm.removeEventListener('submit', logIn);
        logInForm.reset();
        checkAuth();
    } else {
        loginInput.style.borderColor = '#ff0000';

    }
}

function notAuthoriz() {
    buttonAuth.addEventListener('click', toogleModalAuth);
    closeAuth.addEventListener('click', toogleModalAuth);
    loginForm.addEventListener('submit', logIn);
}

function checkAuth() {
    if (login) {
        autorized();
    } else {
        notAuthoriz();
    }
}

checkAuth();