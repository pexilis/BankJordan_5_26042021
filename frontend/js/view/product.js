import "../../scss/product.scss";

import "../loaders/global.loader.js";
import PageConfig from "../config/view/product.config.js";
import PageGlobal from "../config/view/global.config.js";

PageConfig.init();

const cartModel = new LocalStorageAPI("cart-storage");
const cartError = new CartError(ConfigValidator, cartModel);
const cart = new Cart(cartModel, RequestFactory, cartError);
const cartCalculate = new CartCalculate(cart);

const product = new Product(RequestFactory, ConfigValidator, cartError);
const loadPage = new LoadPage(product, cart, cartCalculate);
const addArticle = new AddArticle(cart, cartCalculate);
const changeQuantity = new ChangeQuantity(cart, cartCalculate);

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
    loadPage.header().then(data => {
        const {totalProducts} = data;
        PageGlobal.drawQuantities(totalProducts);
    });

    loadPage.article(id).then(data => {
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
        console.log("LOL");
        console.log(error);
    })

    selectQuantity.addEventListener("change", e => {
        const {target} = e;
        const {value} = target;
        const {price} = configProduct.selectedProduct;
    
        configProduct.quantity = value;

        changeQuantity.page({quantity:value,price}).then(data => {
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

        addArticle.run(configProduct.selectedProduct).then(data => {
            const {totalProducts, maxQuantitySelected} = data;

            PageConfig.drawQuantity(maxQuantitySelected);
            PageGlobal.drawQuantities(totalProducts);
            PageGlobal.startAnimation(1200, buttonLoader);
        }).catch(error => {
            console.log(error);
        })
    });
});