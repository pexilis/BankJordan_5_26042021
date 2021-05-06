const ChangeQuantity = (() => {
    let self = {};
    let Cart = null;
    
    self.init = (cart) => {
        Cart = cart;
    }

    self.cart = async(opts) => {
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
        const totalPrice = Cart.calculateTotalPrices();
        quantity = Cart.calculateQuantities();

        return {
            updatedPrice:articleToSet.calculatePrice,
            totalPrice:totalPrice.toString(),
            quantity
        }
    }

    self.page = async(opts) => {
        if ([opts.price, opts.quantity].includes(undefined))
            throw new {error:"UNDEFINED_ERROR"};

        let quantity = Number.parseInt(opts.quantity);


        let price = Number.parseInt(opts.price.slice(0, opts.price.length - 2));
        return price * quantity;
    }

    return self;
})();

export default ChangeQuantity;