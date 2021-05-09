class CartCalculate {
    constructor(cart) {
        this.Cart = cart;
    }

    totalPrices() {
        const {Cart} = this;
        const {CartModel, CartError} = Cart.getEveryDependencies();

        const arrArticle = CartModel.getArray();
        const paidPrices = [];

        if (arrArticle.length === 0)
            return 0;
            
        arrArticle.map(article => {
            CartError.errorFormat(article);
            const paidPrice = Number.parseInt(article.calculatePrice, 10);
            paidPrices.push(paidPrice);
        });

        return paidPrices.reduce((old, next) => old + next);
    }

    quantities (){
        const {Cart} = this;
        const {CartModel, CartError} = Cart.getEveryDependencies();

        const arrArticle = CartModel.getArray();
        const quantities = [];

        if (arrArticle.length === 0)
            return 0;

        arrArticle.map(article => {
            CartError.errorFormat(article);
            const quantity = Number.parseInt(article.quantity);
            quantities.push(quantity);
        });

        return quantities.reduce((old, curr) => old + curr);
    }
}

export default CartCalculate;