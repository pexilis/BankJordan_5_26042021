class Cart{
    constructor(model, request, error) {
        this.CartModel = model;
        this.RequestFactory = request;
        this.CartError = error;
    }

    getEveryDependencies() {
        const {CartModel, RequestFactory, CartError} = this;

        return {
            CartModel,
            RequestFactory,
            CartError
        };
    }

    async listArticles() {
        const {CartError, CartModel} = this.getEveryDependencies();
        let result = CartModel.getArray();
        result.map(article => CartError.errorFormat(article));
        return Promise.resolve(result);
    }

    clearCart() {
        const {CartModel} = this.getEveryDependencies();
        CartModel.clearArray();
    }

    addArticle(article) {
        const {CartModel, CartError} = this.getEveryDependencies();

        CartError.errorFormat(article);
        const old = CartModel.getById(article._id);
        
        if (old){
            this.updateArticleWithNewQuantity(old, article);
        }else{
            this.updatePaidPrice(article);
            CartModel.addItem(article);
        }

        return CartModel.getById(article._id);
    }

    removeArticle(id) {
        const {CartModel, CartError} = this.getEveryDependencies();

        CartError.errorID(id);
        let article = CartModel.getById(id);
        CartModel.removeItem(id);

        return article;
    }

    setArticleById(id, article) {
        const {CartModel, CartError} = this.getEveryDependencies();
        
        CartError.errorID(id);
        CartError.errorFormat(article);
        CartModel.removeItem(id);
        this.addArticle(article);

        return article;
    };

    getArticleById(id) {
        const {CartModel, CartError} = this.getEveryDependencies();

        CartError.errorID(id);
        return CartModel.getById(id);
    }

    async getEveryProductsId() {
        let articles = await this.listArticles();
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

    updatePaidPrice(article) {
        const quantity = Number.parseInt(article.quantity, 10);
        const price = Number.parseInt(article.price.slice(0, -2));
        const updated_price = quantity * price;
        article.calculatePrice = updated_price.toString();
    }

    updateArticleWithNewQuantity(old, article) {
        const {CartModel, CartError} = this.getEveryDependencies();

        let new_quantity = Number.parseInt(old.quantity) +
                             Number.parseInt(article.quantity);
        
        new_quantity = new_quantity.toString();

        article.quantity = new_quantity;
        this.updatePaidPrice(article);

        try{
            CartError.errorFormat(article);
        }catch(e){
            throw {error:"ADD_ERROR"};
        }

        CartModel.setById(article._id, article);
    }
}


export default Cart;