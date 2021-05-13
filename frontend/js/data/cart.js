/**
 * @author Bank Jordan <jordan.developper@outlook.com>
 * @description Class to manage relative to Cart access data with user input validation
 */

import "../typedef/typedefs.js";


const PrivateMethod = (() => {
    let self = {};

    self.updatePaidPrice = (article,obj) => {
        const quantity = Number.parseInt(article.quantity, 10);
        const price = Number.parseInt(article.price.slice(0, -2));
        const updated_price = quantity * price;
        article.calculatePrice = updated_price.toString();
    }

    self.updateArticleWithNewQuantity = (old, article, obj) => {
        const {CartModel, CartError} = obj.getEveryDependencies();

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

class Cart{
    /**
     * Create a Cart.
     * @param {localStorageAPI} model - LocalStorageAPI dependency
     * @param {RequestFactory} request - RequestFactory dependency
     * @param {CartError} error - CartError dependancy
     */
    constructor(model, request, error) {
        this.CartModel = model;
        this.RequestFactory = request;
        this.CartError = error;
    }

    /**
     * Get injected dependencies.
     * @return {Dependencies}
     */
    getEveryDependencies() {
        const {CartModel, RequestFactory, CartError} = this;

        return {
            CartModel,
            RequestFactory,
            CartError
        };
    }

    /**
     * List Articles
     * @async
     * @return {Promise} - Every articles from LocalStorage Cart
     */
    async listArticles() {
        const {CartError, CartModel} = this.getEveryDependencies();
        let result = CartModel.getArray();
        result.map(article => CartError.errorFormat(article));
        return Promise.resolve(result);
    }

    /**
     * Clear Cart
     * Removes all items from the cart
     */
    clearCart() {
        const {CartModel} = this.getEveryDependencies();
        CartModel.clearArray();
    }

    /**
     * Add article
     * Add Article in LocalStorage, update quantity when already exist 
     * @param {Article} article - NewArticle,
     * @return {Article} - Added article
     */
    addArticle(article) {
        const {CartModel, CartError} = this.getEveryDependencies();

        CartError.errorFormat(article);
        const old = CartModel.getById(article._id);
        
        if (old){
            PrivateMethod.updateArticleWithNewQuantity(old, article, this);
        }else{
            PrivateMethod.updatePaidPrice(article, this);
            CartModel.addItem(article);
        }

        return CartModel.getById(article._id);
    }

    /**
     * Delete article
     * Remove article from LocalStorage
     * @param {string} id - Backend id of article
     * @return {Article} - Deleted article
     */
    removeArticle(id) {
        const {CartModel, CartError} = this.getEveryDependencies();

        CartError.errorID(id);
        let article = CartModel.getById(id);
        CartModel.removeItem(id);

        return article;
    }

    /**
     * Change Article
     * Replaces the item passed in parameter whose id matches
     * @param {string} id - Backend id of article
     * @return {Article} - Modified article
     */

    setArticleById(id, article) {
        const {CartModel, CartError} = this.getEveryDependencies();
        
        CartError.errorID(id);
        CartError.errorFormat(article);
        CartModel.removeItem(id);
        this.addArticle(article);

        return article;
    };

    /**
     * Get Article
     * Get article by id
     * @param {string} id - Backend id of article
     * @return {Article} - Article
     */

    getArticleById(id) {
        const {CartModel, CartError} = this.getEveryDependencies();

        CartError.errorID(id);
        return CartModel.getById(id);
    }

    /**
     * Get Every Products Id
     * @return {string[]} - Array of products id
     */

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
}

export default Cart;