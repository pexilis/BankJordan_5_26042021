
/**
 * @author Bank Jordan <jordan.developper@outlook.com>
 * @description Class to manage relative to Cart operation
 */

 import "../typedef/typedefs.js";

class CartCalculate {
    /**
     * Create a CartCalculate
     * @param {Cart} cart - Cart dependancy
     */
    constructor(cart) {
        this.Cart = cart;
    }

    /**
     * Calculate total Prices
     * @return {Number[]}
     */

    totalPrices() {
        const {Cart} = this;
        const {CartModel, CartError} = Cart.getEveryDependencies();

        const arrArticle = CartModel.getArray();
        let paidPrices = [];

        if (arrArticle.length === 0)
            return 0;
            
        paidPrices = arrArticle.map(article => {
            CartError.errorFormat(article);
            const paidPrice = Number.parseInt(article.calculatePrice, 10);
            return paidPrice;
        });

        return paidPrices.reduce((old, next) => old + next);
    }

    /**
     * Calculate quantites
     * @return {Number[]}
     */

    quantities (){
        const {Cart} = this;
        const {CartModel, CartError} = Cart.getEveryDependencies();

        const arrArticle = CartModel.getArray();
        let quantities = [];

        if (arrArticle.length === 0)
            return 0;

        quantities = arrArticle.map(article => {
            CartError.errorFormat(article);
            const quantity = Number.parseInt(article.quantity);
            return quantity;
        });

        return quantities.reduce((old, curr) => old + curr);
    }
}

export default CartCalculate;