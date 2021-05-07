const AddArticle = (() => {
    let self = {};
    let Cart = null;
    let CartCalculate = null;

    self.init = (cart, calcul) => {
        Cart = cart;
        CartCalculate = calcul;
    }

    self.run = async(article) => {
        const addedArticle = Cart.addArticle(article);
        const minQuantitySelected = 1;
        const maxQuantitySelected = 99 - addedArticle.quantity;
        const totalProducts = CartCalculate.quantities();

        return {
            addedArticle,
            minQuantitySelected,
            maxQuantitySelected,
            totalProducts
        }
    }

    return self;
})();

export default AddArticle;