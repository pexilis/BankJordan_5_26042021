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
        const serverProducts = data.serverProducts;
        const totalProducts = data.totalProducts;
        const templateCardElement = PageConfig.templateCardElement;
        const cardContainer = PageConfig.cardContainer;

        serverProducts.forEach(element => {
            const card = PageConfig.generateCard(element, templateCardElement);
            cardContainer.appendChild(card);
        })

        PageGlobal.drawQuantities(totalProducts);
    })
    .catch(error => {
        console.log(error);
    });

});