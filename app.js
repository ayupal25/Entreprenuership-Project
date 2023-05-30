let approw = document.getElementById("apps");
let mainrow = document.getElementById("mains");
let cartitems = document.getElementById("cartlist");
let total = document.getElementById("total");
let quantity = document.getElementById("quantity")

let listCards  = [];

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        price: 120,
        cat: 'app',
        pic: 'pic1.jpg'
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        price: 120,
        cat: 'app',
        pic: 'pic2.jpg'
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        price: 220,
        cat: 'app',
        pic: 'pic3.jpg'
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        price: 220,
        cat: 'app',
        pic: 'pic4.jpg'
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        price: 120,
        cat: 'main',
        pic: 'pic5.jpg'
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        price: 120,
        cat: 'main',
        pic: 'pic6.jpg'
    },
    {
        id: 7,
        name: 'PRODUCT NAME 7',
        price: 220,
        cat: 'main',
        pic: 'pic7.jpg'
    },
    {
        id: 8,
        name: 'PRODUCT NAME 8',
        price: 220,
        cat: 'main',
        pic: 'pic3.jpg'
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
        <button type="button" class="btn bg-primary" onclick="addToCard(${key})">Add to cart</button>
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
