const pageConfig = (() => {
    let self = {};
    self.data = {};
    self.place = {};

    self.selectQuantity = document.querySelector("#quantity");
    self.selectLenses = document.querySelector("#lenses");
    self.nameProduct = document.querySelector(".form__header h1");
    self.priceProduct = document.querySelector(".form__header span");
    self.descriptionProduct = document.querySelector(".form__description p");
    self.totalPriceElement = document.querySelector(".form__price span");
    self.productButton = document.querySelector(".form__button");
    self.buttonLoader = document.querySelector(".btn__loader");
    self.productContainer = document.querySelector(".l-product");

    self.place["image"] = document.querySelector('div[data-place="image"]');

    self.init = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get("id");
        self.data["id"] = id;
    }

    self.drawQuantity = max => {
        let selectQuantity = self.selectQuantity;
        selectQuantity.innerHTML = "";
        for (let i = 1 ; i <= max ; i++){
            const option = document.createElement("option");
            option.setAttribute("value", i);
            option.textContent = i;
            selectQuantity.appendChild(option);
        }

        selectQuantity.classList.add("apparition");
    }

    self.drawLenses = data => {
        let selectLenses = self.selectLenses;
        selectLenses.innerHTML = "";
    
        data.forEach(lense => {
            const option = document.createElement("option");
            option.setAttribute("value", lense);
            option.textContent = lense;
            selectLenses.appendChild(option);
        })

        selectLenses.classList.add("apparition");
    }

    self.generateImage = data => {
        let imgElement = document.createElement("img");
        imgElement.className = "l-product__img apparition";
        imgElement.setAttribute("src", data);

        return imgElement;
    }

    self.drawInfos = data => {
        let nameProduct = self.nameProduct;
        let priceProduct = self.priceProduct;
        let descriptionProduct = self.descriptionProduct;

        const name = data.name;
        const price = `${data.price.slice(0, data.price.length - 2)}€`;
        const description = data.description;

        document.title = `Orinoco - Appareil Photo - ${name}`;
        nameProduct.classList.add("apparition");
        priceProduct.classList.add("apparition");
        descriptionProduct.classList.add("apparition");

        nameProduct.textContent = name;
        priceProduct.textContent = price;
        descriptionProduct.textContent = description;
    }
    
    self.drawTotalPrice = data => {
        let totalPriceElement = self.totalPriceElement;
        const priceStr = `Prix total : ${data}€`;
        totalPriceElement.textContent = priceStr;
    }

    self.drawImage = (imageUrl) => {
        const {productContainer, place} = self;
        const elementImage = self.generateImage(imageUrl);
        productContainer.replaceChild(elementImage, place["image"]);
    }

    return self;
})();

(() => {
    pageConfig.data.quantity = 1;
})();

export default pageConfig;