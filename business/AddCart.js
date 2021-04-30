const AddCart = (() => {
    let self = {};
    let Cart = null;
    let Product = null;

    self.init = (cart, product) => {
        Cart = cart;
        Product = product;
    }

    self.run = async(article) => {
        article = Cart.addArticle(article);
        let limit = Number.parseInt(article.quantity) === 99;

        return {
            article,
            limit
        };
    }

    return self;
})();

export default AddCart;