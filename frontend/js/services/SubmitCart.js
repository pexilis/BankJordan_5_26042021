const SubmitCart = (() => {
    let self = {};
    let Cart = null;
    let CartSubmit = null;
    let Command = null;
    
    self.init = (cart, submit, command) => {
        Cart = cart;
        CartSubmit = submit;
        Command = command;
    }

    self.run = async(opts) => {
        let result = await CartSubmit.submit(opts);
        Command.add(result);
        Cart.clearCart();
        
        return {
            result
        }
    }

    return self;
})();

export default SubmitCart;