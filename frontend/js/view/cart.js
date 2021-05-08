import "../../scss/cart.scss";

import "../loaders/global.loader.js";
import PageConfig from "../config/view/cart.config.js";
import PageGlobal from "../config/view/global.config.js";

(() => {
    const CartModel = new LocalStorageAPI("cart-storage");
    const CommandModel = new LocalStorageAPI("command-storage");
    CartError.init(ConfigValidator, CartModel);
    Cart.init(CartModel, RequestFactory, CartError);
    CartCalculate.init(Cart);
    CartSubmit.init(Cart);
    Product.init(RequestFactory, ConfigValidator, CartError);
    CommandError.init(ConfigValidator);
    Command.init(CommandModel, CommandError);
    LoadPage.init(Product, Cart, CartCalculate);
    ChangeQuantity.init(Cart, CartCalculate);
    LoadPage.init(Product, Cart, CartCalculate);
    DeleteArticle.init(Cart, CartCalculate);
    SubmitCart.init(Cart, CartSubmit, Command);
})();

const handleClose = target => {
    const currentCard = DOMApi.findParentNode(target, "card--cart");
        const id = currentCard.getAttribute("data-id");

        DeleteArticle.run(id).then(data => {
            const places = PageGlobal.place;
            const {article, totalPrice, quantity} = data;
            cardContainer.replaceChild(places[0], currentCard);
            
            totalElement.textContent = `Total : ${totalPrice}€`;

            PageGlobal.drawQuantities(quantity);
            PageConfig.drawTotal(totalPrice);

        }).catch(error => {       
            alert(error.error);
        });
}

const handleChange = target => {
    const currentCard = DOMApi.findParentNode(target, "card--cart");
    const selectElement = currentCard.querySelector("select");

    const id = currentCard.getAttribute("data-id");
    const quantity = selectElement.value;

    ChangeQuantity.cart({id, quantity}).then(data => {
        const {updatedPrice, totalPrice, quantity} = data;

        PageConfig.drawPrice(currentCard, updatedPrice);
        PageGlobal.drawQuantities(quantity);
        PageConfig.drawTotal(totalPrice);
    }).catch(error => {
        alert(error.error);
    })
}

const {cardContainer, formButton, totalElement, templateCard, formElement} = PageConfig;
const {place:places} = PageGlobal;

document.addEventListener("DOMContentLoaded", () => {
    LoadPage.header().then(data => {
        const {totalProducts} = data;
        PageConfig.drawQuantities(totalProducts);
    }).catch(error => {
        console.log(error);
    });

    LoadPage.cart().then(data => {
        const {clientProducts, totalPrice} = data;
        
        clientProducts.map((product,index) => {
            const card = PageConfig.generateCard(product, templateCard);
            cardContainer.replaceChild(card, places[index]);
        });

        PageConfig.drawTotal(totalPrice);
    }).catch(error => {
        console.log(error);
    });

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

        SubmitCart.run(opts).then(data => {
            const {orderId} = data.result;
            PageGlobal.drawQuantities(0);
            PageConfig.drawTotal(0);
            cardContainer.innerHTML = "";
            window.location.replace(`./biling.html?id=${orderId}`);
        }).catch(error => {
            alert(error.error);
        })
    }
});