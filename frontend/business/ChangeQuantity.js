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
        const quantity = opts.quantity;
        const articleToSet = Cart.getArticleById(id);

        if (articleToSet === undefined)
            return {
                articleModified:undefined,
            }
        
        articleToSet.quantity = quantity;
        Cart.setArticleById(id, articleToSet);
        const totalPrice = Cart.calculateTotalPrices();

        return {
            updatedPrice:articleToSet.calculatePrice,
            totalPrice:totalPrice.toString()
        }
    }

    self.page = async(opts) => {
        if ([opts.price, opts.quantity].includes(undefined))
            throw new {error:"UNDEFINED_ERROR"};

        let quantity = Number.parseInt(opts.quantity);
        let price = Number.parseInt(opts.price.split("0")[0]);
        return price * quantity;
    }

    return self;
})();

export default ChangeQuantity