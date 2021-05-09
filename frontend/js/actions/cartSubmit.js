class CartSubmit {
    constructor(cart) {
        this.Cart = cart;
    }

    async submit(submitForm) {
        const {Cart} = this;
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
}

export default CartSubmit;