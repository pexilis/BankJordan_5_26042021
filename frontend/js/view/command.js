import Global from "./config/global.config.js";
import LocalStorageAPI from "./utils/localStorageAPI.js";
import ConfigValidator from "./config/validator.config.js";
import RequestFactory from "./config/request.config.js";

import Cart from "./controllers/cart.js";
import Product from "./controllers/product.js";

Cart.init(new LocalStorageAPI("cart-storage"), 
          new LocalStorageAPI("command-storage"), 
          ConfigValidator, 
          RequestFactory
);

Product.init(RequestFactory, ConfigValidator);


document.addEventListener("DOMContentLoaded", () => {
    
});