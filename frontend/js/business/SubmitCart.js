const ChangeQuantity = (() => {
    let self = {};
    let Cart = null;
    
    self.init = (cart) => {
        Cart = cart;
    }

    self.run = async(opts) => {
        let result = await Cart.submit(opts);

        return {
            result
        }
    }

    return self;
})();

export default ChangeQuantity;