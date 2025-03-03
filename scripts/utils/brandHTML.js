
export function generateBrandHTML(product) {
    return `
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
};
