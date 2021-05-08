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

document.addEventListener("DOMContentLoaded", () => {
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

    LoadPage.run({id}).then(data => {
        const {lenses, imageUrl:urlImg, name} = data.selectedProduct;
        const {maxQuantitySelected:maxQuantity, totalProducts} = data;
        const elementImage = PageConfig.generateImage(urlImg);

        configProduct.selectedProduct = data.selectedProduct;
        productContainer.replaceChild(elementImage, place["image"]);

        PageConfig.drawQuantity(maxQuantity);
        PageConfig.drawLenses(lenses);
        PageConfig.drawText(data.selectedProduct);
        PageGlobal.drawQuantities(totalProducts);   

        configProduct.quantity = selectQuantity.value;
    }).catch(error => {
        alert(error.error);
    })

    selectQuantity.addEventListener("change", e => {
        const target = e.target;
        const quantity = target.value;
        const price = configProduct.selectedProduct.price;
    
        configProduct.quantity = quantity;

        ChangeQuantity.page({quantity,price}).then(data => {
            PageConfig.drawTotalPrice(data);
        }).catch(error => {
            alert(error.error);
        })
    });

    productButton.addEventListener("click", e => {
        e.preventDefault();
    
        const quantity = configProduct.quantity;
        configProduct.selectedProduct.quantity = quantity;
        
       
            AddArticle.run(configProduct.selectedProduct).then(data => {
                PageConfig.drawQuantity(data.maxQuantitySelected);
                const totalProducts = data.totalProducts;
                configProduct.quantity = 1;
                PageGlobal.drawQuantities(totalProducts);

                PageGlobal.startAnimation(800, buttonLoader);
            }).catch(error => {
                alert(error.error);
            })
    });
});