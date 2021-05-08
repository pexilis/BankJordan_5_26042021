import "../../scss/index.scss";

import "../loaders/global.loader.js";
import PageConfig from "../config/view/index.config.js";
import PageGlobal from "../config/view/global.config.js";
import LoadPage from "../services/LoadPage";

(() => {
       const CartModel = new LocalStorageAPI("cart-storage");
       CartError.init(ConfigValidator, CartModel);
       Cart.init(CartModel, RequestFactory, CartError);
       Product.init(RequestFactory, ConfigValidator, CartError);
       CartCalculate.init(Cart);
       LoadPage.init(Product, Cart, CartCalculate);
})();

const {templateCardElement, cardContainer} = PageConfig;
const {place} = PageGlobal;


document.addEventListener("DOMContentLoaded", () => {
    LoadPage.header().then(data => {
        const {totalProducts} = data;
        PageGlobal.drawQuantities(totalProducts);
    })

    .then(data => {
        const {serverProducts} = data;
        PageConfig.drawCards(serverProducts, place);         
    })
    .catch(error => {
        console.log(error);
    });
});