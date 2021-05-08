const PageConfig = (() => {
    let self = {};

    // Components
    self.formElement = document.forms["cartForm"];
    self.cardContainer = document.querySelector(".l-cart__left > div");
    self.formButton = document.querySelector(".btn--green");
    self.totalElement = document.querySelector(".l-cart__total");
    self.templateCard = document.querySelector("#cardTemplate");
    self.counterElement = document.querySelector(".l-header__counter");
    self.buttonLoader = document.querySelector(".btn__loader");


    const handleChange = target => {
        const currentCard = DOMApi.findParentNode(target, "card--cart");
        const selectElement = currentCard.querySelector("select");
    
        const id = currentCard.getAttribute("data-id");
        const quantity = selectElement.value;
    
        ChangeQuantity.cart({id, quantity}).then(data => {
            const {updatedPrice, totalPrice, quantity} = data;
    
            self.drawPrice(currentCard, updatedPrice);
            self.drawQuantities(quantity);
            self.drawTotal(totalPrice);
        }).catch(error => {
            alert(error.error);
        })
    }

    // Generator 
    self.generateCard = (data,template) => {
        const {name, calculatePrice, imageUrl, quantity, _id} = data;
        const temp = template;
        const cloned = temp.content.cloneNode(true);

        const element = cloned.querySelector("div");
        const imgElement = cloned.querySelector("img");
        const titleElement = cloned.querySelector(".card__title");
        const priceElement = cloned.querySelector(".card__price");
        const selectElement = cloned.querySelector("#quantity");

        element.setAttribute("data-id", _id);
        imgElement.setAttribute("src", imageUrl);
        titleElement.textContent = name;
        priceElement.textContent = `${calculatePrice}€`;
        
        for (let i = 1 ; i <= 99 ; i++) {
            const optElement = document.createElement("option");
            optElement.setAttribute("value", i);
            optElement.textContent = i;
            selectElement.appendChild(optElement);
        }

        selectElement.value = quantity;
        selectElement.onchange = e => handleChange(e.target);
        return cloned;
    }

    self.drawPrice = (card, price) => {
        const priceElement = card.querySelector(".card__price");
        priceElement.textContent = `${price}€`;
    }

    self.drawQuantities = totalProducts => {
        self.counterElement.style.display = "none";
    
        if (totalProducts > 0){
            self.counterElement.textContent = totalProducts;
            self.counterElement.style.display = "flex";
        }
    }

    self.drawTotal = total => {
        const formatedNumber = Number.parseInt(total);
        const isGreatZero = (formatedNumber >= 1);

        if (isGreatZero){
            self.totalElement.textContent = `Total : ${total}€`
        }else{
            self.totalElement.textContent = "Vous n'avez pas d'articles";
        }
    }

    return self;
})();

export default PageConfig;