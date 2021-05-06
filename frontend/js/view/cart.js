import Global from "../config/global.config.js";
import LocalStorageAPI from "../utils/localStorageAPI.js";
import ConfigValidator from "../config/validator.config.js";
import RequestFactory from "../config/request.config.js";

import Cart from "../controllers/cart.js";
import Product from "../controllers/product.js";
import PageConfig from "../config/view/cart.config.js";

import LoadPage from "../business/LoadPage.js";
import DeleteArticle from "../business/DeleteArticle.js";
import ChangeQuantity from "../business/ChangeQuantity.js";
import SubmitCart from "../business/SubmitCart.js";

Cart.init(new LocalStorageAPI("cart-storage"), 
          new LocalStorageAPI("command-storage"), 
          ConfigValidator, 
          RequestFactory
);

Product.init(RequestFactory, ConfigValidator);

LoadPage.init(Product, Cart);
DeleteArticle.init(Cart);
ChangeQuantity.init(Cart);
SubmitCart.init(Cart);


const formToJSON = (form, keys) => {
    console.log(form);
    const formData = new FormData(form);
    const jsonDict = {};
    keys.map(key => {
        const value = formData.get(key);
        jsonDict[key] = value;
    })

    return jsonDict;
}

const findParentNode = (node, className) => {
    let current = node;
    let containClass = current.classList.contains(className);

    while (!containClass){
        current = current.parentNode;
        containClass = current.classList.contains(className);
    }
    
    return current;
}

const handleClose = target => {
    const currentCard = findParentNode(target, "card--cart");
        const id = currentCard.getAttribute("data-id");

        DeleteArticle.run(id).then(data => {
            const {article, totalPrice, quantity} = data;
            cardContainer.removeChild(currentCard);
            totalElement.textContent = `Total : ${totalPrice}€`;

            PageConfig.drawQuantities(quantity);
            PageConfig.drawTotal(totalPrice);

        }).catch(error => {       
            alert(error.error);
        });
}

const handleChange = target => {
    const currentCard = findParentNode(target, "card--cart");
    const selectElement = currentCard.querySelector("select");

    const id = currentCard.getAttribute("data-id");
    const quantity = selectElement.value;

    ChangeQuantity.cart({id, quantity}).then(data => {
        const {updatedPrice, totalPrice, quantity} = data;

        PageConfig.drawPrice(currentCard, updatedPrice);
        PageConfig.drawQuantities(quantity);
        PageConfig.drawTotal(totalPrice);
    }).catch(error => {
        alert(error.error);
    })
}

const {cardContainer, formButton, totalElement, templateCard, formElement} = PageConfig;

document.addEventListener("DOMContentLoaded", () => {
    LoadPage.run().then(data => {
        const {clientProducts, totalProducts, totalPrice} = data;
    
        clientProducts.map(product => {
            const card = PageConfig.generateCard(product, templateCard);
            cardContainer.appendChild(card);
        });

        PageConfig.drawQuantities(totalProducts);
        PageConfig.drawTotal(totalPrice);
    }).catch(error => {
        alert(error.error);
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
        if (isChange)
            handleChange(target);
    }

    formButton.onclick = e => {
        e.preventDefault();
        const opts = formToJSON(formElement, 
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

            PageConfig.drawQuantities(0);
            PageConfig.drawTotal(0);
            cardContainer.innerHTML = "";
            window.location.replace(`/command.html?id=${orderId}`);

        }).catch(error => {
            alert(error.error);
        })
    }
});