const DeleteArticle = (() => {
    let self = {};
    let Cart = null;
   
    self.init = (cart) => {
        Cart = cart;
    }

    self.run = async(id) => {
        const article = Cart.removeArticle(id);
        const totalPrice = Cart.calculateTotalPrices();
        const quantity = Cart.calculateQuantities();

        return {
            article,
            totalPrice,
            quantity
        };
    }

    return self;
})();

export default DeleteArticle;