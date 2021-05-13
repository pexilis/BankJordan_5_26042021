import "../../scss/index.scss";

import "../loaders/global.loader.js";
import PageConfig from "../config/view/index.config.js";
import PageGlobal from "../config/view/global.config.js";

const cartModel = new LocalStorageAPI("cart-storage");
const cartError = new CartError(ConfigValidator, cartModel);
const cart = new Cart(cartModel, RequestFactory, cartError);
const cartCalculate = new CartCalculate(cart, cartError);
const product = new Product(RequestFactory, ConfigValidator, cartError);
const loadPage = new LoadPage(product, cart, cartCalculate);
const {templateCardElement, cardContainer} = PageConfig;
const {place} = PageGlobal;

document.addEventListener("DOMContentLoaded", () => {
    loadPage.header().then(data => {
        const {totalProducts} = data;
        PageGlobal.drawQuantities(totalProducts);
    }).catch(error => {
        if (error.error === "FORMAT_ERROR")
            PageGlobal.showModal(PageGlobal.formatBadCart);
    });

    loadPage.index().then(data => {
        const {serverProducts} = data;
        PageConfig.drawCards(serverProducts, place);         
    })
    .catch(error => {
       if (error.error === "CLIENT_ERROR")
            PageGlobal.showModal(PageGlobal.clientMessage);
        if (error.error === "FORMAT_ERROR")
            PageGlobal.showModal(PageGlobal.formatMessage);
        if (error.error === "NETWORK_ERROR")
            PageGlobal.showModal(PageGlobal.networkMessage);
    });
});