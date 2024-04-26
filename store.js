//get cookie 'cart'

let cart = JSON.parse(document.cookie.split('; ').find(row => row.startsWith('cart=')).split('=')[1])

let checkoutItems = document.getElementById('checkoutItems');

let priceTotal = 0;
for(let i = 0; i < cart.length; i++){
    let item = cart[i];
    let itemElement = document.createElement('div');
    itemElement.classList.add('d-flex', 'justify-content-between', 'mb-3');
    itemElement.innerHTML = `
    <div class="d-flex gap-2" >
        <div class="cart-item-image">
            <img src="${item.imageSrc}" alt="">
        </div>
        <div class="cart-item-details d-flex flex-column">
            <div class="cart-item-name font-weight-bold">
                ${item.title}
            </div>
            <div class="cart-item-price">
                $${item.price}
            </div>
            <div class="cart-item-quantity">
                ${item.quantity}
            </div>
            <div class="cart-actions mt-auto">
                <div class="text-underline">Remove</div>
            </div>
        </div>
    </div>
    <div>
        $${item.price * item.quantity}
    </div>
`;  
    priceTotal += item.price * item.quantity;
    checkoutItems.appendChild(itemElement);
}

 document.getElementById('subTotal').innerText = `$${priceTotal.toFixed(2)}`;
 document.getElementById('finalPrice').innerText = `$${priceTotal.toFixed(2)}`;


