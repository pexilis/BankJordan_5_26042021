import Global from "../config/global.config.js";
import LocalStorageAPI from "../utils/localStorageAPI.js";
import ConfigValidator from "../config/validator.config.js";
import RequestFactory from "../config/request.config.js";
import "../config/localstorage.config.js";
import PageConfig from "../config/view/index.config.js";

import Cart from "../controllers/cart.js";
import Product from "../controllers/product.js";

import BuisnessLoad from "../business/LoadPage.js";

Cart.init(new LocalStorageAPI("cart-storage"), 
          new LocalStorageAPI("command-storage"), 
          ConfigValidator, 
          RequestFactory
);

Product.init(RequestFactory, ConfigValidator);
BuisnessLoad.init(Product, Cart);

document.addEventListener("DOMContentLoaded", () => {
    BuisnessLoad.run()
    .then(data => {
        const serverProducts = data.serverProducts;
        const totalProducts = data.totalProducts;
        const templateCardElement = PageConfig.templateCardElement;
        const cardContainer = PageConfig.cardContainer;

        serverProducts.forEach(element => {
            const card = PageConfig.generateCard(element, templateCardElement);
            cardContainer.appendChild(card);
        })

        PageConfig.drawQuantities(totalProducts);
    })
    .catch(error => {
        alert(error.error);
    });

});