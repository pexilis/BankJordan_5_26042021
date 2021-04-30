import Global from "./config/global.config.js";
import LocalStorageAPI from "./utils/localStorageAPI.js";
import ConfigValidator from "./config/validator.config.js";
import RequestFactory from "./config/request.config.js";

import Cart from "./controllers/cart.js";

Cart.init(new LocalStorageAPI("cart-storage"), ConfigValidator, RequestFactory);

document.addEventListener("DOMContentLoaded", () => {
   
});