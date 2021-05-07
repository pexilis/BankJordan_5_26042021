const DeleteArticle = (() => {
    let self = {};
    let Cart = null;
    let CartCalculate = null;
   
    self.init = (cart, calcul) => {
        Cart = cart;
        CartCalculate = calcul;
    }

    self.run = async(id) => {
        const article = Cart.removeArticle(id);
        const totalPrice = CartCalculate.totalPrices();
        const quantity = CartCalculate.quantities();

        return {
            article,
            totalPrice,
            quantity
        };
    }

    return self;
})();

export default DeleteArticle;