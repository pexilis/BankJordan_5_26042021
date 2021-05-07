const CartCalculate = (() => {
    let self = {};
    let Cart = null;

    self.init = cart => {
        Cart = cart;
    }

    self.totalPrices = _ => {
        const {CartModel, CartError} = Cart.getEveryDependencies();

        const arrArticle = CartModel.getArray();
        const paidPrices = [];

        arrArticle.map(article => {
            CartError.errorFormat(article);
            const paidPrice = Number.parseInt(article.calculatePrice, 10);
            paidPrices.push(paidPrice);
        });

        if (arrArticle.length === 0)
            return 0;

        return paidPrices.reduce((old, next) => old + next);
    }

    self.quantities = _ => {
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

    return self;
})();

export default CartCalculate;