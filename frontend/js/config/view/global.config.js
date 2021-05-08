const PageGlobal = (() => {
    let self = {};

    self.counterElement = document.querySelector(".l-header__counter");
    self.place = [];

    self.drawQuantities = totalProducts => {
        self.counterElement.style.display = "none";
        if (totalProducts > 0){
            self.counterElement.textContent = totalProducts;
            self.counterElement.style.display = "flex";
        }
    }

    self.startAnimation = (time, element) => {
        element.classList.add("active");

        setTimeout(() => {
            element.classList.remove("active");
        }, time);
    }

    return self;
})();

(() => {
    for (let i = 0 ; i < 6 ; i++){
        const element = document.querySelector(`div[data-place="${i}"]`);
        PageGlobal.place[i] = element;
    }
})();


export default PageGlobal;