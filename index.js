import Global from "./config/global.config.js";
import LocalStorageAPI from "./utils/localStorageAPI.js";
import ConfigValidator from "./config/validator.config.js";
import RequestFactory from "./config/request.config.js";

import Cart from "./controllers/cart.js";
import Product from "./controllers/product.js";

Cart.init(new LocalStorageAPI("cart-storage"), ConfigValidator, RequestFactory);
Product.init(RequestFactory, ConfigValidator);


document.addEventListener("DOMContentLoaded", () => {
    document?.querySelector("#fetchAll")
            ?.addEventListener("click", e => {
                Product.fetchEvery().then(products => console.log(products))
                                    .catch(error => console.log(error));
            });
    
    document?.querySelector("#fetchOne")
            ?.addEventListener("click", e => {
                Product.fetchById("5be1ed3f1c9d44000030b061").then(products => console.log(products))
                                    .catch(error => console.log(error));
            });
});