import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


renderOrderSummary();

function renderOrderSummary() {
    let html = '';
    cart.forEach((cartItem) => {
    
        let matchingProduct;
        products.forEach((product) => {
            if (cartItem.productId === product.id) {
                matchingProduct = product
            }
        });
    
        let matchingDeliveryOption;
        deliveryOptions.forEach((option) => {
            if (option.id === cartItem.deliveryOptionId) {
                matchingDeliveryOption = option
            }
        });
    
        const today = dayjs();
        const date = today.add(matchingDeliveryOption.deliveryDays, 'day');
        const deliveryDate = date.format('dddd, MMMM D');
    
    
        html += `
            <div class="product__flex js-product-flex-${matchingProduct.id}">
                <div class="delivery__date js-delivery-date-${matchingProduct.id}">
                    Delivery date: ${deliveryDate}
                </div>
    
                <div class="product__display__container">
                    <div class="column1__container">        
                        <div class="product__image">
                            <img src="${matchingProduct.image}" alt="Product Image" class="product-image">
                        </div>
    
                        <div class="product__detail">
                            <div class="product-name">
                                ${matchingProduct.name}
                            </div>
                            <div class="product-storage">
                                Storage: ${matchingProduct.storage}GB | ${matchingProduct.ram}GB RAM
                            </div>
                            <div class="product-price">
                                $${matchingProduct.price}
                            </div>
                            <div class="product__quantity">
                                <div class="product-quantity">
                                    Quantity: ${cartItem.quantity}
                                </div>
                                <div class="product-btn">
                                    <button class="delete-btn js-delete-btn"
                                            data-product-id="${matchingProduct.id}">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>            
                    </div>
                    
                    <div class="column2__container js-delivery-options">
                        <div class="delivery__option__header">
                            Choose a delivery option:
                        </div>
                        ${generateDeliveryHTML(matchingProduct, cartItem)}    
                    </div>
                </div>
            </div> 
        `;
    });
    
    document.querySelector('.js-order-summary').innerHTML = html;
    
    document.querySelectorAll('.js-delete-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const container = document.querySelector(`.js-product-flex-${productId}`);
            // remove cart from backend (cart data)
            removeFromCart(productId);
            // remove cart from frontend
            renderPaymentSummary();
            container.remove();
        })
    });
    
    document.querySelectorAll('.js-delivery-option-container').forEach((element) => {
        element.addEventListener('click', () => {
            const productId = element.dataset.productId;
            const deliveryOptionId = element.dataset.deliveryOptionId;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        })
    });
    
    function generateDeliveryHTML(matchingProduct, cartItem) {
        let html = '';
    
        deliveryOptions.forEach((option, index) => {
            const today = dayjs();
            const date = today.add(option.deliveryDays, 'day');
            const deliveryDate = date.format('dddd, MMMM D');
            const shippingPrice = option.priceCents === 0;
            const isChecked = cartItem.deliveryOptionId === option.id;
    
            html += `
                <div    class="delivery__option__container js-delivery-option-container"
                        data-product-id="${matchingProduct.id}"
                        data-delivery-option-id="${option.id}">
                    <input  type="radio" name="delivery-option-${matchingProduct.id}" 
                            id="delivery-option-${matchingProduct.id}-${index}"
                            ${ isChecked ? 'checked' : ''}>
                    <label for="delivery-option-${matchingProduct.id}-${index}">
                        <div class="delivery-date">
                            ${deliveryDate}
                        </div>
                        <div class="shipping-price">
                            ${ shippingPrice ? 'FREE Shipping' : `$${option.priceCents / 100} Shipping`}
                        </div>
                    </label>
                </div>
            `;
            });
        
        return html
    };
};
