import { products } from "../data/products.js";
import { addToCart, cart } from "../data/cart.js";
import { generateBrandHTML } from "./utils/brandHTML.js";

let samsungHTML = "";
let oppoHTML = "";
let appleHTML = "";
let xiaomiHTML = "";
let googleHTML = "";

products.forEach((product) => {
  if (product.brand === "Samsung") {
    samsungHTML += generateBrandHTML(product);
  } else if (product.brand === "Oppo") {
    oppoHTML += generateBrandHTML(product);
  } else if (product.brand === "Apple") {
    appleHTML += generateBrandHTML(product);
  } else if (product.brand === "Xiaomi") {
    xiaomiHTML += generateBrandHTML(product);
  } else if (product.brand === "Google") {
    googleHTML += generateBrandHTML(product);
  }
});

document.querySelector(".js-brand-samsung-container").innerHTML = samsungHTML;
document.querySelector(".js-brand-oppo-container").innerHTML = oppoHTML;
document.querySelector(".js-brand-apple-container").innerHTML = appleHTML;
document.querySelector(".js-brand-xiaomi-container").innerHTML = xiaomiHTML;
document.querySelector(".js-brand-google-container").innerHTML = googleHTML;

document.querySelectorAll(".js-product-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
});

updateCartQuantity();
function updateCartQuantity() {
  let quantity = 0;

  cart.forEach((cartItem) => {
    quantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = quantity;
};
