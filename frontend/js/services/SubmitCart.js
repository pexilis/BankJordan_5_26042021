class SubmitCart {
    constructor(cart, submit, command) {
        this.Cart = cart;
        this.CartSubmit = submit;
        this.Command = command;
    }

   async run(opts) {
        const {CartSubmit, Cart, Command} = this;
        let result = await CartSubmit.submit(opts);
        Command.add(result);
        Cart.clearCart();
        
        return {
            result
        }
    }
}

export default SubmitCart;