let cart = {};

const container = document.querySelector('#container');

window.onload = function () {
    loadShop();
    checkCart();
    showMiniCart();

}

async function loadShop() {

    const promise = await fetch('shop.json');
    let data = await promise.json()
    console.log(data);

    let out = '';

    for (let key in data) {
        out += '<div class="items">';
        out += `<h3 class="text">${data[key]["name"]}</h3>`;
        out += `<p class="text">Cost: ${data[key]["cost"]}</p>`;
        out += `<img src="${data[key]["image"]}" width="200" height="200">`;
        out += `<button class="addButton text" dataArticle="${key}">Buy</button>`;
        out += '</div>';

    }
    container.innerHTML = out;

    let buttons = document.querySelectorAll('button.addButton');

    for (let key in buttons) {
        buttons[key].onclick = function () {
            addButton(this);
        }
    }

}

function addButton(articleButton) {

    let articleNumber = articleButton.getAttribute('dataArticle');

    if (cart[articleNumber] != undefined) {
        cart[articleNumber]++;
    }
    else {
        cart[articleNumber] = 1;
    }
    console.log(cart);

    localStorage.setItem("cart", `${JSON.stringify(cart)}`);

    showMiniCart();
}


function checkCart() {

    if (localStorage.getItem("cart") != null) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }

}

function showMiniCart() {

    let out = '';
    for (let key in cart) {
        out += `articul ${key}-----${cart[key]} <br>`
    }
    out += `<div class="text"><a href="cart.html">CART<a></div>`
    const miniCard = document.querySelector('#miniCard')
    miniCard.innerHTML = out;
}