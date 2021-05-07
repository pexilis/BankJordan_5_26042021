const CartSubmit = (() => {
    let self = {};

    let Cart = null;

    self.init = cart => {
        Cart = cart;
    }

    self.submit = async(submitForm) => {
        const {CartError, RequestFactory, CartModel} = Cart.getEveryDependencies();

        CartError.errorSubmit(submitForm);
        CartError.errorProducts();
        
        const products = await Cart.getEveryProductsId();
        let request = RequestFactory.get("submitCart");

        let result = await request.send({
            contact:submitForm,
            products
        });

        return result;
    }

    return self;
})();

export default CartSubmit;