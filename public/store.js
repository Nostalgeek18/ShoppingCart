const removeButtons = document.querySelectorAll('.btn-danger');
const priceCart     = document.querySelector('.cart-total-price');
const quantityInput = document.querySelectorAll('.cart-quantity-input');
const purchaseBtn   = document.querySelector('.btn-purchase');



quantityInput.forEach(itemInput => {
    itemInput.addEventListener('change', quantityChanged)
})

function quantityChanged(event){
    let input = event.target;
    if (isNaN(input.value) || input.value <=0) {
        input.value = 1;
    }
    updateCartTotal();
}

//************ADD ITEM CART ***************/
const addToCartButtons = document.querySelectorAll('.shop-item-btn');

addToCartButtons.forEach(btn => {
    btn.addEventListener('click', addToCartClicked)
})

function addToCartClicked(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemtoCart(title,price,imageSrc);
    updateCartTotal();
}

function addItemtoCart(title,price,imageSrc){
    let isDuplicate = false;
    let cartRow     = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemsNames = cartItems.querySelectorAll('.cart-item-title');
    cartItemsNames.forEach(item => {
        if(item.innerHTML == title){
            isDuplicate = true;
        }
    })
    if (isDuplicate){
        alert('This item is already in the cart !')
    }else{
        let cartRowContents = `
        <div class="cart-item cart-column">
           <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
           <span class="cart-item-title">${title}</span>
       </div>
       <span class="cart-price cart-column">${price}</span>
       <div class="cart-quantity cart-column">
           <input class="cart-quantity-input" type="number" value="1">
           <button class="btn btn-danger" role="button">REMOVE</button>
       </div>`
       cartRow.innerHTML = cartRowContents;
       cartItems.append(cartRow);
       cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
       cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    }
}

/*********************************************************************** */

//***********************DELETE ELEMENT *********************/
//**********************************************************/

removeButtons.forEach(btn => {
    btn.addEventListener('click', removeCartItem)
});

function removeCartItem(event) {
    let btnClicked = event.target;
    btnClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

//Update cart's price
function updateCartTotal(){
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows          = cartItemContainer.querySelectorAll('.cart-row');
    let total             = 0;

    cartRows.forEach(cartRow => {
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price = parseFloat(priceElement.innerText.replace('$',''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    })
    total = Math.round(total * 100) /100
    priceCart.innerText = '$' + total;

}

//*************VALIDATE PURCHASE *************/

purchaseBtn.addEventListener('click', ()=> {
    alert('Thank you for your purchase !');
    let cartItems = document.querySelector('.cart-items');
    console.log(cartItems);
   while (cartItems.hasChildNodes()){
       cartItems.removeChild(cartItems.firstChild)
   }
   updateCartTotal();
})