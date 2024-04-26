let cart = [];

//This will populate the overview of the cart at the navbar
function setCartItemNumber(){
    let cartData = document.cookie.split('; ').find(row => row.startsWith('cart='));
    if(cartData){
        cart = JSON.parse(cartData.split('=')[1]);
    }
    document.getElementById('addedItems').innerText = cart.length;
}

//Add new item to the cart
function addToCart(){
    let itemElement = event.target.parentElement.parentElement;
    let itemID = itemElement.getAttribute('id');
    let imageSrc = itemElement.querySelector('img').src;
    let title = itemElement.querySelector('.recent-item-name').innerText;
    let price = itemElement.querySelector('.base-price') ? itemElement.querySelector('.base-price').innerText : itemElement.querySelector('.new-price').innerText; 
    
    //The price is converted from string to float
    price = parseFloat(price.replace('$',''));

    let item = {
        id: itemID,
        title: title,
        imageSrc: imageSrc,
        price: price,
        quantity: 1
    }

    //If there is an existing item, add quantity, if not the new item should be pushed to the cart
    let existingItem = cart.find(item => item.id === itemID);
    if(existingItem){
        existingItem.quantity++;
    }else{
        cart.push(item);
    }

    document.getElementById('addedItems').innerText = cart.length;
    //create cookie to store items
    let date = new Date();
    date.setTime(date.getTime() + (6*60*60*1000)); // set cookie expiration 6 hours from now
    let expires = "; expires=" + date.toUTCString();
    document.cookie = `cart=${JSON.stringify(cart)}${expires}`;
}

//This will open the overview of the shopping cart
function viewCart(){
    let cartContainer = document.getElementById('cartItemsContainer');
    cartContainer.classList.toggle('visible');

    //If the cart is empty, show the according div
    if(cart.length === 0){
        document.getElementById('noItems').classList.add('visible');
        document.getElementById('cartItemsWrapper').classList.add('hidden');
        document.getElementById('noItems').classList.remove('hidden');
        document.getElementById('cartItemsWrapper').classList.remove('visible');
    }else{
        document.getElementById('noItems').classList.add('hidden');
        document.getElementById('cartItemsWrapper').classList.add('visible');
        document.getElementById('noItems').classList.remove('visible');
        document.getElementById('cartItemsWrapper').classList.remove('hidden');
    }

    
    let cartItems = document.getElementById('cartItems');
    let priceTotal = 0;
   
    //This will clear the cart first to avoid multiple items
    while(cartItems.firstChild){
        cartItems.removeChild(cartItems.firstChild);
    }

    //Loop through the cart and create the elements
    for(let i = 0; i < cart.length; i++){
        let item = cart[i];
        let itemElement = document.createElement('div');
        itemElement.classList.add('d-flex');
        itemElement.innerHTML = `
            <div class="mb-2">
                <img src="${item.imageSrc}">
            </div>
            <div class="item-details">
                <div class="item-name">${item.title}</div>
                <div class="item-quantity">Qty: ${item.quantity}</div>
            </div>
        `;
       priceTotal += item.price * parseInt(item.quantity);
       cartItems.appendChild(itemElement);
    }

    let priceTotalElement = document.createElement('div');
    priceTotalElement.style.fontWeight = '600'; priceTotalElement.style.fontSize = '18px';
    priceTotalElement.innerHTML = `Total: $${parseFloat(priceTotal).toFixed(2)}`;
    cartItems.appendChild(priceTotalElement);
    console.log('cart viewed')

}

//Handle the active state of the Navbar
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(navItem => {
    navItem.addEventListener('click', () => {
        navItems.forEach(navItem => {
            navItem.children[0].classList.remove('active');
        });
        navItem.children[0].classList.add('active');
    });
});

setCartItemNumber()
   
   
   
