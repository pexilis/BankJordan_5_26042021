class ChangeQuantity {
    constructor(cart, calcul) {
        this.Cart = cart;
        this.CartCalculate = calcul;
    }

    async cart(opts) {
        const {Cart, CartCalculate} = this;
        if ([opts.id, opts.quantity].includes(undefined))
            throw new {error:"UNDEFINED_ERROR"};
    
        const id = opts.id; 
        let quantity = opts.quantity;
        const articleToSet = Cart.getArticleById(id);

        if (articleToSet === undefined)
            return {
                articleModified:undefined,
            }
    
        articleToSet.quantity = quantity;
        Cart.setArticleById(id, articleToSet);
        const totalPrice = CartCalculate.totalPrices();
        quantity = CartCalculate.quantities();

        return {
            updatedPrice:articleToSet.calculatePrice,
            totalPrice:totalPrice.toString(),
            quantity
        }
    }

    async page(opts) {
        if ([opts.price, opts.quantity].includes(undefined))
            throw new {error:"UNDEFINED_ERROR"};

        let quantity = Number.parseInt(opts.quantity);
        let price = Number.parseInt(opts.price.slice(0, opts.price.length - 2));

        return price * quantity;
    }
}

export default ChangeQuantity;