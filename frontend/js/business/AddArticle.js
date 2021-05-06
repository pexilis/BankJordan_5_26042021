const AddArticle = (() => {
    let self = {};
    let Cart = null;

    self.init = cart => {
        Cart = cart;
    }

    self.run = async(article) => {
        const addedArticle = Cart.addArticle(article);
        const minQuantitySelected = 1;
        const maxQuantitySelected = 99 - addedArticle.quantity;
        const totalProducts = Cart.calculateQuantities();

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