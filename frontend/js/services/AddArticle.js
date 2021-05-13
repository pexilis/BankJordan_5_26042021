class AddArticle {
    constructor(cart, calcul) {
        this.Cart = cart; 
        this.CartCalculate = calcul;
    }

    async run(article) {
        const {Cart, CartCalculate} = this;
        const addedArticle = Cart.addArticle(article);
        const minQuantitySelected = 1;
        const maxQuantitySelected = process.env.MAX_QUANTITY - addedArticle.quantity;
        const totalProducts = CartCalculate.quantities();

        return {
            addedArticle,
            minQuantitySelected,
            maxQuantitySelected,
            totalProducts
        }
    }
}

export default AddArticle;