const PageGlobal = (() => {
    let self = {};

    self.counterElement = document.querySelector(".l-header__counter");

    self.drawQuantities = totalProducts => {
        self.counterElement.style.display = "none";
        if (totalProducts > 0){
            self.counterElement.textContent = totalProducts;
            self.counterElement.style.display = "block";
        }
    }

    return self;
})();

export default PageGlobal;