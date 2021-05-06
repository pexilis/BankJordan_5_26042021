import Global from "../config/global.config.js";

import LocalStorageAPI from "../utils/localStorageAPI.js";
import ConfigValidator from "../config/validator.config.js";
import RequestFactory from "../config/request.config.js";
import "../config/localstorage.config.js";

import PageConfig from "../config/view/product.config.js";

import Cart from "../controllers/cart.js";
import Product from "../controllers/product.js";

import BuisnessLoad from "../business/LoadPage.js";
import ChangeQuantity from "../business/ChangeQuantity.js";
import AddArticle from "../business/AddArticle.js";

Cart.init(new LocalStorageAPI("cart-storage"), 
          new LocalStorageAPI("command-storage"), 
          ConfigValidator, 
          RequestFactory
);

Product.init(RequestFactory, ConfigValidator);

BuisnessLoad.init(Product, Cart);
ChangeQuantity.init(Cart);
AddArticle.init(Cart);

PageConfig.init();

document.addEventListener("DOMContentLoaded", () => {
    let configProduct = PageConfig.data;
    let {id} = configProduct;

    let {
            selectQuantity, 
            productButton,                
            counterElement 
        } = PageConfig;

    BuisnessLoad.run({id}).then(data => {
        const {lenses, imageUrl:urlImg} = data.selectedProduct;
        const {maxQuantitySelected:maxQuantity, totalProducts} = data;

        configProduct.selectedProduct = data.selectedProduct;
        
        PageConfig.drawQuantity(maxQuantity);
        PageConfig.drawLenses(lenses);
        PageConfig.drawImage(urlImg);
        PageConfig.drawText(data.selectedProduct);
        PageConfig.drawQuantities(totalProducts);   

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
            PageConfig.drawQuantities(totalProducts);
        }).catch(error => {
            alert(error.error);
        })
    });
});