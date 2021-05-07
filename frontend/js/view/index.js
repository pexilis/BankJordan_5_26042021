import "../../scss/index.scss";

import "../loaders/global.loader.js";
import PageConfig from "../config/view/index.config.js";
import PageGlobal from "../config/view/global.config.js";

(() => {
       const CartModel = new LocalStorageAPI("cart-storage");
       CartError.init(ConfigValidator, CartModel);
       Cart.init(CartModel, RequestFactory, CartError);
       Product.init(RequestFactory, ConfigValidator, CartError);
       CartCalculate.init(Cart);
       LoadPage.init(Product, Cart, CartCalculate);
})();

document.addEventListener("DOMContentLoaded", () => {
    LoadPage.run()
    .then(data => {
        const {serverProducts, totalProducts} = data;
        const {templateCardElement, cardContainer} = PageConfig;
        const places = PageGlobal.place;

        serverProducts.forEach((element, index) => {
            const card = PageConfig.generateCard(element, index, templateCardElement);
            cardContainer.replaceChild(card, places[index]);
        })

        PageGlobal.drawQuantities(totalProducts);
    })
    .catch(error => {
        console.log(error);
    });

});