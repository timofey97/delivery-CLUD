const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const cardMenu = document.querySelector('.cards-menu');
const logo = document.querySelector('.logo');

let login = localStorage.getItem('gloDelivery');

function toggleModal() {
    modal.classList.toggle("is-open");
}

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

function createCardReastaurant() {
    const card = `<a class="card card-restaurant">
						<img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">Тануки</h3>
								<span class="card-tag tag">60 мин</span>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="rating">
									4.5
								</div>
								<div class="price">От 1 200 ₽</div>
								<div class="category">Суши, роллы</div>
							</div>
						</div>			
                    </a>`;
    cardRestaurants.insertAdjacentHTML('beforeend', card);
}

function creatCardFood() {
    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', `
    <img src="img/pizza-plus/pizza-girls.jpg" alt="image" class="card-image" />
                        <div class="card-text">
                            <div class="card-heading">
                                <h3 class="card-title card-title-reg">Пицца Девичник</h3>
                            </div>
                            <!-- /.card-heading -->
                            <div class="card-info">
                                <div class="ingredients">Соус томатный, постное тесто, нежирный сыр, кукуруза, лук, маслины, грибы, помидоры, болгарский перец.
                                </div>
                            </div>
                            <!-- /.card-info -->
                            <div class="card-buttons">
                                <button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
                                <strong class="card-price-bold">450 ₽</strong>
                            </div>
                        </div>
                   `);

    cardMenu.insertAdjacentElement('beforeend', card);

}

function openGoods(event) {

    const target = event.target;
    const restaurant = target.closest('.card-restaurant');

    if (restaurant && login) {
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');

        cardMenu.textContent = '';

        creatCardFood();
        creatCardFood();
        creatCardFood();
    } else {
        toogleModalAuth();
    }


}


cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
cardRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', function() {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
});

checkAuth();

createCardReastaurant();
createCardReastaurant();
createCardReastaurant();