let approw = document.getElementById("apps");
let mainrow = document.getElementById("mains");
let cartitems = document.getElementById("cartlist");
let total = document.getElementById("total");
let quantity = document.getElementById("quantity")

let listCards  = [];

let products = [
    {
        id: 1,
        name: 'Cream of Vegetable Soup',
        price: 79,
        cat: 'app',
        pic: 'cream.jpg'
    },
    {
        id: 2,
        name: 'Lemon Chicken Soup',
        price: 79,
        cat: 'app',
        pic: 'soup.jpeg'
    },
    {
        id: 3,
        name: 'Chicken Clear Soup',
        price: 89,
        cat: 'app',
        pic: 'clear.jpg'
    },
    {
        id: 4,
        name: 'Mutton Yakhni Soup',
        price: 99,
        cat: 'app',
        pic: 'msoup.jpg'
    },
    {
        id: 5,
        name: 'Chicken Biryani',
        price: 170,
        cat: 'main',
        pic: 'cbiriyani.jpg'
    },
    {
        id: 6,
        name: 'Egg Biryani',
        price: 150,
        cat: 'main',
        pic: 'ebiryani.jpeg'
    },
    {
        id: 7,
        name: 'Biryani Rice',
        price: 140,
        cat: 'main',
        pic: 'biriyanir.jpeg'
    },
    {
        id: 8,
        name: 'Alfham Chicken',
        price: 385,
        cat: 'app',
        pic: 'achicken.jpeg'
    },
    {
        id: 9,
        name: 'Grilled Chicken',
        price: 355,
        cat: 'app',
        pic: 'gchicken.jpg'
    },
    {
        id: 10,
        name: ' Chilli Chicken Dry',
        price: 430,
        cat: 'app',
        pic: 'cchicken.jpeg'
    },
    {
        id: 11,
        name: 'Mutton Pepper Dry',
        price: 560,
        cat: 'app',
        pic: 'mdry.jpeg'
    },
    {
        id: 12,
        name: 'Mutton Raan',
        price: 385,
        cat: 'app',
        pic: 'mran.jpeg'
    },
    {
        id: 13,
        name: 'Chicken Fried Rice',
        price: 200,
        cat: 'main',
        pic: 'cfrice.jpeg'
    },
    {
        id: 14,
        name: 'Mutton Fried Rice',
        price: 230,
        cat: 'main',
        pic: 'mfrice.jpeg'
    },
    {
        id: 15,
        name: 'Fish Curry',
        price: 300,
        cat: 'main',
        pic: 'fish.jpeg'
    },
    {
        id: 16,
        name: 'Prawn Masala',
        price: 380,
        cat: 'main',
        pic: 'prawn.jpeg'
    },
    {
        id: 17,
        name: 'Fiery Basa Fish Fillet',
        price: 480,
        cat: 'main',
        pic: 'basa.jpeg'
    },
    {
        id: 18,
        name: 'Hot Chilly Seer Fish Tawa Fry',
        price: 500,
        cat: 'main',
        pic: 'ffry.jpeg'
    }
    
]

function initApp(){
    products.forEach((value, key) =>{
        let colDiv = document.createElement('div');
        colDiv.classList.add('col');
        let classDiv = document.createElement('div');
        classDiv.classList.add('card','bg-success','text-center');
        let cbDiv = document.createElement('div');
        cbDiv.classList.add('card-body', 'justify-content-center')
        cbDiv.innerHTML = `
        <h5 class="card-title lead">
            ${value.name}
        </h5>
        <h6 class="card-body lead">
            ₹${value.price}
        </h6>
        `;
        classDiv.innerHTML = `
            <img src="pictures/${value.pic}" class="card-img-top" alt="...">
        `;
        classDiv.appendChild(cbDiv);
        colDiv.appendChild(classDiv);

        if(value.cat == 'app'){
            approw.appendChild(colDiv);
        }
        else{
            mainrow.appendChild(colDiv); 
        }
    })
}
initApp();



function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
        sessionStorage.setItem("cart",listCards);
    }
    reloadCard();
}

function reloadCard(){
    cartitems.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let liDiv = document.createElement('li');
            liDiv.classList.add('list-group-item','bg-success','border-0');
            liDiv.innerHTML = `
                <h6>${value.name}</h6>
                <p class="lead">₹${value.price.toLocaleString()}</p>
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" class="btn btn-outline-dark btn-sm" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <button type="button" class="btn btn-outline-dark disabled">${value.quantity}</button>
                    <button type="button" class="btn btn-outline-dark btn-sm" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                cartitems.appendChild(liDiv);
        }
    })
    total.innerText = "Total: ₹"+totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
function gatewayCard(){
    let listCards1 = sessionStorage.getItem("cart"); 
    cartitems1.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards1.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let liDiv = document.createElement('li');
            liDiv.classList.add('list-group-item','bg-success','border-0');
            liDiv.innerHTML = `
                <h6>${value.name}</h6>
                <p class="lead">₹${value.price.toLocaleString()}</p>
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" class="btn btn-outline-dark btn-sm" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <button type="button" class="btn btn-outline-dark disabled">${value.quantity}</button>
                    <button type="button" class="btn btn-outline-dark btn-sm" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                cartitems1.appendChild(liDiv);
        }
    })
    total1.innerText = "Total: ₹"+totalPrice.toLocaleString();
    quantity.innerText = count;
}
