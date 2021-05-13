import "../../scss/biling.scss";

import "../loaders/global.loader.js";
import PageConfig from "../config/view/biling.config.js";
import PageGlobal from "../config/view/global.config.js";


const model = new LocalStorageAPI("command-storage");
const cartModel = new LocalStorageAPI("cart-storage");
const cartError = new CartError(ConfigValidator, cartModel);
const cart = new Cart(cartModel, RequestFactory, cartError);
const cartCalculate = new CartCalculate(cart, cartError);
const product = new Product(RequestFactory, ConfigValidator, cartError);
const loadPage = new LoadPage(product, cart, cartCalculate);

const commandError = new CommandError(ConfigValidator);
const command = new Command(model, commandError);
const commandCalculate = new CommandCalculate(command);
const generateCommand = new GenerateCommand(command, commandCalculate);
const id = PageConfig.data["id"];

document.addEventListener("DOMContentLoaded", () => {
    loadPage.header().then(data => {
        const {totalProducts} = data;
        PageGlobal.drawQuantities(totalProducts);
    }).catch(error => {
        if (error.error === "FORMAT_ERROR")
            PageGlobal.showModal(PageGlobal.formatBadCart);
    });

    generateCommand.run(id).then(data => {
        PageConfig.drawInfo(id, data);
    }).catch(error => {
         if (error.error === "FORMAT_ERROR")
            PageGlobal.showModal(PageGlobal.formatMessage);
    });
});