import "../../scss/cart.scss";

import "../loaders/global.loader.js";
import PageConfig from "../config/view/cart.config.js";
import PageGlobal from "../config/view/global.config.js";


const cartModel = new LocalStorageAPI("cart-storage");
const cartError = new CartError(ConfigValidator, cartModel);
const cart = new Cart(cartModel, RequestFactory, cartError);
const cartCalculate = new CartCalculate(cart);
const cartSubmit = new CartSubmit(cart);

const commandModel = new LocalStorageAPI("command-storage");
const commandError = new CommandError(ConfigValidator);
const command = new Command(commandModel, commandError);

const product = new Product(RequestFactory, ConfigValidator, cartError);

const changeQuantity = new ChangeQuantity(cart, cartCalculate);
const loadPage = new LoadPage(product, cart, cartCalculate);
const deleteArticle = new DeleteArticle(cart, cartCalculate);
const submitCart = new SubmitCart(cart, cartSubmit, command);


const handleClose = target => {
    const currentCard = DOMApi.findParentNode(target, "card--cart");
    const id = currentCard.getAttribute("data-id");

        deleteArticle.run(id).then(data => {
            const places = PageGlobal.place;
            const {article, totalPrice, quantity} = data;
            cardContainer.replaceChild(places[0], currentCard);
            
            totalElement.textContent = `Total : ${totalPrice}€`;

            PageGlobal.drawQuantities(quantity);
            PageConfig.drawTotal(totalPrice);
            if (quantity === 0) {
                PageConfig.hideForm();
            }

        }).catch(error => {       
            if (["INITIALIZATION_ERROR", "EMPTY_ERROR", "FORMAT_ERROR"]
                .includes(error.error))
                PageGlobal.showModal(PageGlobal.formatBadCart);
        });
}

const handleChange = (target) => {
    const currentCard = DOMApi.findParentNode(target, "card--cart");
    const selectElement = currentCard.querySelector("select");

    const id = currentCard.getAttribute("data-id");
    const quantity = selectElement.value;

    changeQuantity.cart({id, quantity}).then(data => {
        const {updatedPrice, totalPrice, quantity} = data;

        PageConfig.drawPrice(currentCard, updatedPrice);
        PageConfig.drawQuantities(quantity);
        PageConfig.drawTotal(totalPrice);
    }).catch(error => {
        if (error.error === "FORMAT_ERROR")
            PageGlobal.showModal(PageGlobal.formatBadQuantity);
    })
}

const {cardContainer, formButton, totalElement, templateCard, formElement} = PageConfig;
const {place:places} = PageGlobal;

document.addEventListener("DOMContentLoaded", () => {
    loadPage.header().then(data => {
        const {totalProducts} = data;
        PageConfig.drawQuantities(totalProducts);
    }).catch(error => {
        if (error.error === "FORMAT_ERROR")
            PageGlobal.showModal(PageGlobal.formatBadCart);
    });

    loadPage.cart().then(data => {
        const {clientProducts, totalPrice} = data;
        
        if (clientProducts.length === 0) {
            PageConfig.hideForm();
        }

        clientProducts.map((product,index) => {
            const card = PageConfig.generateCard(product, templateCard);
            const selectElement = card.querySelector("#quantity");
            selectElement.onchange = e => handleChange(e.target);
            cardContainer.replaceChild(card, places[index]);
        });

        PageConfig.drawTotal(totalPrice);
    })

    cardContainer.onclick = e => {
        const target = e.target;

        const isClose = (
            target.classList.contains("card__close") || 
            target.tagName === "svg" ||
            target.tagName === "path"
        );

        const isChange = (
            target.getAttribute("id") === "quantity"
        );

        if (isClose)
            handleClose(target);
       
    }

    formButton.onclick = e => {
        e.preventDefault();
        const opts = JSONManip.formToJSON(formElement, 
            [
                "firstName", 
                "lastName",
                "email",
                "city",
                "address"
            ]
        );

        submitCart.run(opts).then(data => {
            const {orderId} = data.result;
            PageGlobal.drawQuantities(0);
            PageConfig.drawTotal(0);
            cardContainer.innerHTML = "";
            window.location.replace(`./biling.html?id=${orderId}`);
        }).catch(error => {
            if (["INITIALIZATION_ERROR"].includes(error.error))
                PageGlobal.showModal(PageGlobal.formatBadCart);
            if (error.error === "FORMAT_ERROR")
                PageGlobal.showModal(PageGlobal.formatCartMessage);   
        })
    }
});