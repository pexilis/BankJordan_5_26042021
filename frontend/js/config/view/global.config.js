const PageGlobal = (() => {
    let self = {};

    self.counterElement = document.querySelector(".l-header__counter");
    self.modalWrapper = document.querySelector(".wrapper--modal");
    self.modal = document.querySelector(".modal");    
    self.modalDescription = document.querySelector(".modal__description");

    self.clientMessage = "Veuillez-nous excuser mais l'article que vous recherchez n'est actuellement pas disponsible à la vente."
    self.formatMessage = "Format du lien incorrect, veuillez contacter l'assistance technique si le problème persiste"
    self.networkMessage = "Veuillez-nous excuser mais notre service est actuellement indisponible. Merci de revenir plus tard"
    self.formatCartMessage = "Formulaire invalide. Veuillez rentrer des informations conformes"
    self.formatBadQuantity = "La quantité fourni n'est pas conforme aux attentes. Veuillez contacter le service technique si le problème persiste"
    self.formatBadCart = "Il semble que le panier soit corrompue. Veuillez contacter le service technique pour de l'aide"
    self.genericBadFormat = "Les informations reçues par l'application ne sont pas correctes. Veuillez contacter le service technique si le problème persiste"

    self.place = [];

    self.drawQuantities = totalProducts => {
        self.counterElement.style.display = "none";
        if (totalProducts > 0){
            self.counterElement.textContent = totalProducts;
            self.counterElement.style.display = "flex";
        }
    }

    self.closeModal = () => {
        const {modalDescription, modalWrapper, modal} = self;
        modalWrapper.style.display = "none";
        modal.style.display = "none";
    }

    self.showModal = message => {
        const {modalDescription, modalWrapper, modal} = self;
        modalDescription.textContent = message;
        modalWrapper.style.display = "block";
        modal.style.display = "block";
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

    PageGlobal.modal.onclick = e => {
        const {target} = e;
        const {classList} = target;
        const isCross = target.tagName === "path";

        if (isCross){
            PageGlobal.closeModal();
        }
    }
})();


export default PageGlobal;