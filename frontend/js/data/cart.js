const Cart = (() => {
    let self = {};
    self.CartModel = null;
    self.RequestFactory = null;
    self.CartError = null;

    self.init = (model, request, error) => {
        self.CartModel = model;
        self.RequestFactory = request;
        self.CartError = error;
    }

    self.getEveryDependencies = () => {
        const {CartModel, RequestFactory, CartError} = self;

        return {
            CartModel,
            RequestFactory,
            CartError
        };
    }

    self.listArticles = async() => {
        const {CartError, CartModel} = self.getEveryDependencies();
        let result = CartModel.getArray();
        result.map(article => CartError.errorFormat(article));
        return Promise.resolve(result);
    }

    self.clearCart = _ => {
        const {CartModel} = self.getEveryDependencies();
        CartModel.clearArray();
    }

    self.addArticle = article => {
        const {CartModel, CartError} = self.getEveryDependencies();

        CartError.errorFormat(article);
        const old = CartModel.getById(article._id);
        
        if (old){
            self.updateArticleWithNewQuantity(old, article);
        }else{
            self.updatePaidPrice(article);
            CartModel.addItem(article);
        }

        return CartModel.getById(article._id);
    }

    self.removeArticle = (id) => {
        const {CartModel, CartError} = self.getEveryDependencies();

        CartError.errorID(id);
        let article = CartModel.getById(id);
        CartModel.removeItem(id);

        return article;
    }

    self.setArticleById = (id, article) => {
        const {CartModel, CartError} = self.getEveryDependencies();

        CartError.errorID(id);
        CartError.errorFormat(article);

        
        CartModel.removeItem(id);
        self.addArticle(article);

        return article;
    };

    self.getArticleById = id => {
        const {CartModel, CartError} = self.getEveryDependencies();

        CartError.errorID(id);
        return CartModel.getById(id);
    }

    self.getEveryProductsId = async() => {
        let articles = await Cart.listArticles();
        let products = [];

        articles.map(article => {
            const quantity = Number.parseInt(article.quantity);
            const uuid = article._id;
            for (let i = 0 ; i < quantity ; i++){
                products.push(uuid);
            }
        })

        return products;
    }

    self.updatePaidPrice = article => {
        const quantity = Number.parseInt(article.quantity, 10);
        const price = Number.parseInt(article.price.slice(0, -2));
        const updated_price = quantity * price;
        article.calculatePrice = updated_price.toString();
    }

    self.updateArticleWithNewQuantity = (old, article) => {
        const {CartModel, CartError} = self.getEveryDependencies();

        let new_quantity = Number.parseInt(old.quantity) +
                             Number.parseInt(article.quantity);
        
        new_quantity = new_quantity.toString();

        article.quantity = new_quantity;
        self.updatePaidPrice(article);

        try{
            CartError.errorFormat(article);
        }catch(e){
            throw {error:"ADD_ERROR"};
        }

        CartModel.setById(article._id, article);
    }

    return self;
})();

export default Cart;