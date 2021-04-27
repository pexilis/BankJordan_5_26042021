import LocalStorageModel from "./localStorageModel";

const Cart = (() => {
    let self = {};

    const cartName = "cart-storage";
    let CartModel = null;

    self.init = newAPI => {
        CartModel = newAPI;
    }

    self.listArticles = async() => {
        errorInit(cartName);
        let result = CartModel.getArray();
        result.map(article => errorFormat(article));
        return Promise.resolve(result);
    }

    const errorInit = _ => {
        const isInit =  !CartModel.isInitialized();
        if (isInit) throw {error:"INITIALIZATION_ERROR"};
    }

    const errorEmpty = _ => {
        const isEmpty = CartModel.isEmpty();
        if (isEmpty) throw {error:"EMPTY_ERROR"};
    }

    const errorFormat = article => {
        const regexUUID = /^[0-9a-z]{24}$/;
        const regexQUANTITY = /^[0-9]{1,2}$/;
        const regexPRICE = /^[0-9]{1,}00$/;
        const regexURL = /^http:\/\/localhost:3000\/images\/vcam_[0-9]{1,}\.jpg$/;

        if (!regexUUID.test(article.id) || !regexQUANTITY.test(article.quantity) || !regexPRICE.test(article.price) || !regexURL.test(article.imageUrl)) 
            throw {error:"FORMAT_ERROR"};
    }

    const calculateQuantity = (old_quantity, new_quantity) => {
        return old_quantity + new_quantity;
    }

    self.clearCart = () => {
        errorInit();
        errorEmpty();
        CartModel.clearArray();
    }

    const updateArticleWithNewQuantity = (old, article) => {
        const new_quantity = calculateQuantity
                            (
                                Number.parseInt(old.quantity), 
                                Number.parseInt(article.quantity)
                            )
                           .toString();

        article.quantity = new_quantity;

        try{
            errorFormat(article);
        }catch(e){
            throw {error:"ADD_ERROR"};
        }

        CartModel.setById(article.id, article);
    }

    self.addArticle = (article) => {
        errorInit();
        errorFormat(article);

        const old = CartModel.getById(article.id);

        if (old){
            updateArticleWithNewQuantity(old, article);
        }else{
            CartModel.addItem(article);
        }
    }

    self.calculateQuantities = () => {
        errorInit();
        const arrArticle = CartModel.getArray();
        const quantities = [];

        arrArticle.map(article => {
            errorFormat(article);
            const quantity = Number.parseInt(article.quantity);
            quantities.push(quantity);
        });

        return quantities.reduce((old, curr) => old + curr);
    }

    return self;
})();

(() => {
    Cart.init(new LocalStorageModel("cart-storage"));
})();

export default Cart;