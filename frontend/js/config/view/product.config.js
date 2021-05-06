const pageConfig = (() => {
    let self = {};
    self.data = {};

    self.selectQuantity = document.querySelector("#quantity");
    self.selectLenses = document.querySelector("#lenses");
    self.productImage = document.querySelector(".l-product img");
    self.nameProduct = document.querySelector(".form__header h1");
    self.priceProduct = document.querySelector(".form__header span");
    self.descriptionProduct = document.querySelector(".form__description p");
    self.totalPriceElement = document.querySelector(".form__price span");
    self.productButton = document.querySelector(".form__button");
    self.counterElement = document.querySelector(".l-header__counter");

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
    }

    self.drawImage = data => {
        let productImage = self.productImage;
        productImage.setAttribute("src", data);
    }

    self.drawText = data => {
        let nameProduct = self.nameProduct;
        let priceProduct = self.priceProduct;
        let descriptionProduct = self.descriptionProduct;

        const name = data.name;
        const price = `${data.price.slice(0, data.price.length - 2)}€`;
        const description = data.description;
    
        nameProduct.textContent = name;
        priceProduct.textContent = price;
        descriptionProduct.textContent = description;
    }
    
    self.drawTotalPrice = data => {
        let totalPriceElement = self.totalPriceElement;
        const priceStr = `Prix total : ${data}€`;
        totalPriceElement.textContent = priceStr;
    }

    self.drawQuantities = totalProducts => {
        self.counterElement.style.display = "none";
    
        if (totalProducts > 0){
            self.counterElement.textContent = totalProducts;
            self.counterElement.style.display = "block";
        }
    }

    return self;
})();

export default pageConfig;