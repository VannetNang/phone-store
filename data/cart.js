
export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) { 
    cart = [{
    productId: '19xj-28xc-394n',
    quantity: 2,
    deliveryOptionId: '1'
}, {
    productId: 'q3cs-1p8k-vh95',
    quantity: 1,
    deliveryOptionId: '3'
}];
};

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export function addToCart(productId) {
    let matchingProduct;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingProduct = cartItem
        }
    });

    if (matchingProduct) {
        matchingProduct.quantity++
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    };

    saveToStorage();
};

export function removeFromCart(productId) {
    let newCart = [];

    cart.forEach((cartItem) => {
        if (productId !== cartItem.productId) {
            newCart.push(cartItem)
        }
    });

    cart = newCart;

    saveToStorage();
};

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage()
};
