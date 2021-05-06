const PageConfig = (() => {
    let self = {};

    self.templateCardElement = document.querySelector("#templateCard");
    self.cardContainer = document.querySelector(".l-presentation div");
    self.counterElement = document.querySelector(".l-header__counter");

    self.generateCard = (data, template) => {
        const temp = template;
        const cloned = temp.content.cloneNode(true);
    
        const formatedPrice = `${data.price.slice(0, data.price.length - 2)}€`;
        const urlProduct = `/product.html?id=${data._id}`;
    
        cloned.querySelector(".card__header h2").textContent = data.name;
        cloned.querySelector(".card__header span").textContent = formatedPrice;
        cloned.querySelector(".card__img img").setAttribute("src", data.imageUrl);
        cloned.querySelector(".card--article").setAttribute("href", urlProduct);
    
        return cloned;
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

export default PageConfig;