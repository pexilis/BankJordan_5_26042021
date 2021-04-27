const Cart = (() => {
    let self = {};

    const cartName = "cart-storage";

    const isInitialized = name => getItem(name) !== null;

    const getItem = item => localStorage.getItem(item);

    self.listArticles = async() => {
        errorInit(cartName);
        let result = JSON.parse(getItem(cartName));
        return Promise.resolve(result);
    }

    const errorInit = name => {
        if (!isInitialized(name)) throw {error:"INITIALIZATION_ERROR"};
    }

    const errorEmpty = name => {
        if (getItem(name) === "[]") throw {error:"EMPTY_ERROR"};
    }

    self.clearCart = async() => {
        errorInit(cartName);
        errorEmpty(cartName);
    }

    return self;
})();

export default Cart;