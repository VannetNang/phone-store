import { products } from "../data/test-product.js";
import { addToCart, cart } from "../data/cart.js";

let html = '';
products.forEach((product) => {

    if (product.brand === 'Samsung') {
        html += `
            <div class="product__container">
                <div class="image__container">
                    <img src="${product.image}" alt="Product Image" class="product-image">
                </div>
                <div class="product-name"> ${product.name} </div>
                <div class="rating__container">
                    <img class="rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png" alt="Rating Stars">
                    <div class="rating-count"> ${product.rating.count} </div>
                </div>
                <div class="product-storage">
                    Storage: ${product.storage}GB | ${product.ram}GB RAM
                </div>
                <div class="product-price">
                    Price: $${product.price}
                </div>
                <div class="btn__container">
                    <button class="product-btn js-product-btn"
                            data-product-id="${product.id}">
                        Add to cart
                    </button>
                </div>  
            </div>  
        `;
    }

    
});

document.querySelector('.js-brand-samsung-container').innerHTML = html;


document.querySelectorAll('.js-product-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();

    })
});

updateCartQuantity();
function updateCartQuantity() {
    let quantity = 0;

    cart.forEach((cartItem) => {
        quantity += cartItem.quantity
    });

    document.querySelector('.js-cart-quantity').innerHTML = quantity;
};
