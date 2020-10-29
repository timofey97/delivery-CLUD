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
const restaurantRating = document.querySelector('.rating');
const restaurantTitle = document.querySelector('.restaurant-title');
const restaurantPrice = document.querySelector('.price');
const restaurantCategory = document.querySelector('.category');
const inputSerch = document.querySelector('.input-search');

let login = localStorage.getItem('gloDelivery');

const getData = async function(url) {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url} Статус ошибки ${response.status}`);
    }

    return await response.json();

};



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

function createCardReastaurant({
    image,
    kitchen,
    name,
    price,
    products,
    stars,
    time_of_delivery
}) {
    const cardReastaurant = document.createElement('a');
    cardReastaurant.className = 'card card-restaurant';
    cardReastaurant.products = products;
    cardReastaurant.info = { kitchen, name, price, stars };

    const card = `<img src="${image}" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${name}</h3>
								<span class="card-tag tag">${time_of_delivery} мин</span>
							</div>
							<div class="card-info">
								<div class="rating">
									${stars}
								</div>
								<div class="price">От ${price} ₽</div>
								<div class="category">${kitchen}</div>
							</div>
                        </div>			`;
    cardReastaurant.insertAdjacentHTML('beforeend', card);
    cardRestaurants.insertAdjacentElement('beforeend', cardReastaurant);
}

function creatCardFood(goods) {

    const {
        description,
        id,
        image,
        name,
        price
    } = goods;

    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', `
    <img src="${image}" alt="image" class="card-image" />
                        <div class="card-text">
                            <div class="card-heading">
                                <h3 class="card-title card-title-reg">${name}</h3>
                            </div>
                            <div class="card-info">
                                <div class="ingredients">${description}
                                </div>
                            </div>
                            <div class="card-buttons">
                                <button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
                                <strong class="card-price-bold">${price} ₽</strong>
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

        const { kitchen, name, rating, price } = restaurant.info;

        restaurantRating.textContent = rating;
        restaurantTitle.textContent = name;
        restaurantPrice.textContent = `От ${price} руб.`;
        restaurantCategory.textContent = kitchen;

        getData(`./db/${restaurant.products}`).then(function(data) {
            data.forEach(creatCardFood);
        });

    } else {
        toogleModalAuth();
    }


}

function init() {
    getData('./db/partners.json').then(function(data) {
        data.forEach(createCardReastaurant);
        console.log(data);
    });

    cartButton.addEventListener("click", toggleModal);
    close.addEventListener("click", toggleModal);
    cardRestaurants.addEventListener('click', openGoods);
    logo.addEventListener('click', function() {
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        menu.classList.add('hide');
    });

    checkAuth();

    inputSerch.addEventListener('keypress', function(event) {
        if (event.charCode === 13) {
            getData('./db/partners.json')
                .then(function(data) {
                    return data.map(function(partner) {
                        return partner.products;
                    });
                })
                .then(function(linkProducts) {
                    cardMenu.textContent = '';

                    linkProducts.forEach(function(link) {
                        getData(`./db/${link}`)
                            .then(function(data) {
                                containerPromo.classList.add('hide');
                                restaurants.classList.add('hide');
                                menu.classList.remove('hide');


                                restaurantRating.textContent = '';
                                restaurantTitle.textContent = 'Результат поиска';
                                restaurantPrice.textContent = '';
                                restaurantCategory.textContent = '';
                                data.forEach(creatCardFood);
                            });
                    });
                });
        }
    });
};


init();