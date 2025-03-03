import { cart } from '../data/cart.js';
import { products } from '../data/products.js';
import { deliveryOptions } from '../data/deliveryOptions.js';


renderPaymentSummary()

export function renderPaymentSummary() {
    let productPrice = 0;
    let shippingPrice = 0;
    let productQuantity = 0;
    
    cart.forEach((cartItem) => {
        let matchingItem;
    
        products.forEach((product) => {
            if (cartItem.productId === product.id) {
                matchingItem = product
            }
        });
        productPrice += cartItem.quantity * matchingItem.price;
    
        deliveryOptions.forEach((deliveryOption) => {
            if (cartItem.deliveryOptionId === deliveryOption.id) {
                matchingItem = deliveryOption
            }
        });
    
        shippingPrice += matchingItem.priceCents;
        productQuantity += cartItem.quantity;
        const totalBeforeTax = (productPrice + (shippingPrice / 100));
        const tax = totalBeforeTax * 0.1;
        const totalPrice = totalBeforeTax + tax;
    
        let html = `
            <div class="payment__summary">
                <h1>Order Summary</h1>
                <div class="payment__detail">
                    <div>
                        Items (${productQuantity}):
                    </div>
                    <div>
                        $${productPrice}
                    </div>
                </div>
                <div class="payment__detail">
                    <div>
                        Shipping & handling:
                    </div>
                    <div>
                        $${shippingPrice / 100}
                    </div>
                </div>
                <hr>
                <div class="payment__detail">
                    <div>
                        Total before tax:
                    </div>
                    <div>
                        $${totalBeforeTax.toFixed(2)}
                    </div>
                </div>
                <div class="payment__detail">
                    <div>
                        Estimated tax (10%):
                    </div>
                    <div>
                        $${tax.toFixed(2)} 
                    </div>
                </div>
                <hr>
                <div class="payment__detail">
                    <div>
                        Order total:
                    </div>
                    <div>
                        $${totalPrice.toFixed(2)}
                    </div>
                </div>
                <div class="payment__button">
                    <button class="order-btn">
                        Place your order
                    </button>
                </div>
            </div>
        `;
    
        document.querySelector('.js-payment-summary').innerHTML = html;
    });
    
}




