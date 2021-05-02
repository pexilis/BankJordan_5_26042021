const LoadPage = (() => {
    let self = {};
    let Cart = null;
   
    self.init = (cart) => {
        Cart = cart;
    }

    self.run = async(id) => {
        const article = Cart.removeArticle(id);
        const totalPrice = Cart.calculateTotalPrices();

        return {
            article,
            totalPrice
        };
    }

    return self;
})();

export default LoadPage