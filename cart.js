const LocalStorageAPI = (() => {
    let self = {};

    self.getArray = name => JSON.parse(localStorage.getItem(name));
    self.isInitialized = name => localStorage.getItem(name) !== null;
    self.clearArray = item => localStorage.setItem(item, "[]");
    
    self.getById = (name, id) => {
        const arrArticle = self.getArray(name);
        const item = arrArticle.find(article => article.id === id);
        return item;
    };

    self.addItem = (name, item) => {
        const arrArticle = self.getArray(name);
        arrArticle.push(item);
        localStorage.setItem(name, JSON.stringify(arrArticle));
    }

    self.setById = (name, id, newItem) => {
        let arrArticle = self.getArray(name);
        
        arrArticle = arrArticle.filter(item => item.id === id)
                               .map(modify => modify = newItem);
        localStorage.setItem(name, JSON.stringify(arrArticle));
    }

    return self;
})();


const Cart = (() => {
    let self = {};

    const cartName = "cart-storage";

    self.listArticles = async() => {
        errorInit(cartName);

        let result = LocalStorageAPI.getArray(cartName);
        return Promise.resolve(result);
    }

    const errorInit = name => {
        const isInit =  !LocalStorageAPI.isInitialized(name);
        if (isInit) throw {error:"INITIALIZATION_ERROR"};
    }

    const errorEmpty = name => {
        const isEmpty = LocalStorageAPI.getArray(name).length === 0;
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
        errorInit(cartName);
        errorEmpty(cartName);
        LocalStorageAPI.clearArray(cartName);
    }

    const updateArticleWithNewQuantity = (old,article) => {
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

        LocalStorageAPI.setById(cartName, article.id, article);
    }

    self.addArticle = (article) => {
        errorInit(cartName);
        errorFormat(article);

        const old = LocalStorageAPI.getById(cartName, article.id);

        if (old){
            updateArticleWithNewQuantity(old, article);
        }else{
            LocalStorageAPI.addItem(cartName, article);
        }
    }

    return self;
})();

export default Cart;