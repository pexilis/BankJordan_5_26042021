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
            counterElement 
        } = PageConfig;

    LoadPage.run({id}).then(data => {
        const {lenses, imageUrl:urlImg} = data.selectedProduct;
        const {maxQuantitySelected:maxQuantity, totalProducts} = data;

        configProduct.selectedProduct = data.selectedProduct;
        
        PageConfig.drawQuantity(maxQuantity);
        PageConfig.drawLenses(lenses);
        PageConfig.drawImage(urlImg);
        PageConfig.drawText(data.selectedProduct);
        PageGlobal.drawQuantities(totalProducts);   

        configProduct.quantity = selectQuantity.value;
    }).catch(error => {
        console.log(error);
    })

    selectQuantity.addEventListener("change", e => {
        const target = e.target;
        const quantity = target.value;
        const price = configProduct.selectedProduct.price;
    
        configProduct.quantity = quantity;

        ChangeQuantity.page({quantity,price}).then(data => {
            PageConfig.drawTotalPrice(data);
        }).catch(error => {
            console.log(error);
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
        }).catch(error => {
            console.log(error);
        })
    });
});