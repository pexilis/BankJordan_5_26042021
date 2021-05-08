const PageConfig = (() => {
    let self = {};

    self.templateCardElement = document.querySelector("#templateCard");
    self.cardContainer = document.querySelector(".l-presentation div");

    self.generateCard = (data, index, template) => {
        const temp = template;
        const cloned = temp.content.cloneNode(true);
    
        const formatedPrice = `${data.price.slice(0, data.price.length - 2)}€`;
        const urlProduct = `./product.html?id=${data._id}`;
        
        const element = cloned.querySelector("a");
        const titleElement = cloned.querySelector(".card__header h2");
        const priceElement =  cloned.querySelector(".card__header span");
        const imgElement = cloned.querySelector(".card__img img");
        const urlElement =  cloned.querySelector(".card--article");

        element.style.animationDelay = `${index * 0.5}s`;
        titleElement.textContent = data.name;
        priceElement.textContent = formatedPrice;
        imgElement.setAttribute("src", data.imageUrl);
        urlElement.setAttribute("href", urlProduct);
    
        return cloned;
    }

    self.drawCards = (element, place) => {
        const {templateCardElement, cardContainer} = self;
        element.forEach((element, index) => {
            const card = PageConfig.generateCard(element, index, templateCardElement);

            if (place[index]){
                cardContainer.replaceChild(card, place[index]);
                return;
            }
                
            CardContainer.appendChild(card);
        });
    }

    return self;
})();


export default PageConfig;