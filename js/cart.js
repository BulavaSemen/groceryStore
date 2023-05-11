let cart = [];

window.onload = function () {
    getJson();
};

async function getJson() {
    const promise = await fetch('shop.json');
    let data = await promise.json()
    console.log(data);

    checkCart();
    showCart();

    function showCart() {

        if (Object.keys(cart).length === 0) {
            myCart.innerHTML = `<div class="text">The page is EMPTY, <a href="index.html">TURN MAIN<a>!</div>`;
        }
        else {
            console.log(localStorage.getItem("cart"));

            let out = "";
            for (let key in cart) {

                out += `<img src="${data[key]["image"]}" width="60" height="60">`;
                out += data[key]["name"] + "<br>";
                out += `${cart[key]} x<br>`;
                out += `<button class="delete text" buttonArticul="${key}">DELETE</button> <br>`;
                out += `<button class="minus text" buttonArticul="${key}">MINUS</button> <br>`;
                out += `<button class="plus text" buttonArticul="${key}">PLUS</button> <br>`;
                out += `${cart[key] * data[key]["cost"]}$ <br>`;
                out += '---------------'
            }
            let myCart = document.querySelector('#myCart');
            myCart.innerHTML += out;

            let plusButton = document.querySelectorAll('.plus');
            for (let y in plusButton) {
                plusButton[y].onclick = function () {
                    plusFunc(this);
                };
            }

            let minusButton = document.querySelectorAll('.minus');
            for (let y in minusButton) {
                minusButton[y].onclick = function () {
                    minusFunc(this);
                };
            }

            let deleteButton = document.querySelectorAll('.delete');
            for (let y in deleteButton) {
                deleteButton[y].onclick = function () {
                    deleteFunc(this);
                };
            }
        }

    }

    function plusFunc(data) {
        let articul = data.getAttribute('buttonArticul');
        cart[articul]++;
        console.log(cart);
        myCart.innerHTML = "";
        saveCartLS();
        showCart();

    }

    function minusFunc(data) {
        let articul = data.getAttribute('buttonArticul');
        if (cart[articul] > 1) {
            cart[articul]--;
        }
        else {
            delete cart[articul];
        }
        console.log(cart);
        myCart.innerHTML = "";
        saveCartLS();
        showCart();

    }

    function deleteFunc(data) {
        let articul = data.getAttribute('buttonArticul');
        delete cart[articul];
        console.log(cart);
        myCart.innerHTML = "";
        saveCartLS();
        showCart();

    }

}

function checkCart() {
    if (localStorage.getItem("cart") != null) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    console.log(cart);
}

function saveCartLS() {
    localStorage.setItem("cart", `${JSON.stringify(cart)}`);
}

