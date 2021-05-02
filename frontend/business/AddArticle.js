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

        return {
            addedArticle,
            minQuantitySelected,
            maxQuantitySelected
        }
    }

    return self;
})();

export default AddArticle;