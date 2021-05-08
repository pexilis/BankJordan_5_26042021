import "../../scss/product.scss";

import "../loaders/global.loader.js";
import PageConfig from "../config/view/product.config.js";
import PageGlobal from "../config/view/global.config.js";

(() => {
    const CartModel = new LocalStorageAPI("cart-storage");
    PageConfig.init();
    CartError.init(ConfigValidator, CartModel);
    Cart.init(CartModel, RequestFactory, CartError);
    Product.init(RequestFactory, ConfigValidator, CartError);
    CartCalculate.init(Cart);
    LoadPage.init(Product, Cart, CartCalculate);
    AddArticle.init(Cart, CartCalculate);
    ChangeQuantity.init(Cart, CartCalculate);
})();

let configProduct = PageConfig.data;
let {id} = configProduct;

let {
            selectQuantity, 
            productButton,                
            counterElement,
            buttonLoader,
            place,
            productContainer 
} = PageConfig;

document.addEventListener("DOMContentLoaded", () => {
    LoadPage.header().then(data => {
        const {totalProducts} = data;
        PageGlobal.drawQuantities(totalProducts);
    });

    LoadPage.article(id).then(data => {
        const {
               selectedProduct, 
               maxQuantitySelected:maxQuantity,
               totalProducts
        } = data;
        const {
                lenses, 
                imageUrl, 
                name
        } = selectedProduct;
        
        configProduct.selectedProduct = data.selectedProduct;

        PageConfig.drawImage(imageUrl);
        PageConfig.drawQuantity(maxQuantity);
        PageConfig.drawLenses(lenses);
        PageConfig.drawInfos(selectedProduct);
    
    }).catch(error => {
        console.log(error);
    })

    selectQuantity.addEventListener("change", e => {
        const {target} = e;
        const {value} = target;
        const {price} = configProduct.selectedProduct;
    
        configProduct.quantity = value;

        ChangeQuantity.page({quantity:value,price}).then(data => {
            PageConfig.drawTotalPrice(data);
        }).catch(error => {
            console.log(error);
        })
    });

    productButton.addEventListener("click", e => {
        e.preventDefault();
        const {quantity} = configProduct;
        configProduct.selectedProduct.quantity = quantity;
        configProduct.quantity = 1;

        AddArticle.run(configProduct.selectedProduct).then(data => {
            const {totalProducts, maxQuantitySelected} = data;

            PageConfig.drawQuantity(maxQuantitySelected);
            PageGlobal.drawQuantities(totalProducts);
            PageGlobal.startAnimation(1200, buttonLoader);
        }).catch(error => {
            console.log(error);
        })
    });
});