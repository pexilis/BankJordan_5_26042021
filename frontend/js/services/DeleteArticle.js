class DeleteArticle {
    constructor(cart, calcul) {
        this.Cart = cart;
        this.CartCalculate = calcul;
    }

    async run(id) {
        const {Cart, CartCalculate} = this;
        const article = Cart.removeArticle(id);
        const totalPrice = CartCalculate.totalPrices();
        const quantity = CartCalculate.quantities();

        return {
            article,
            totalPrice,
            quantity
        };
    }
}

export default DeleteArticle;