const LoadPage = (() => {
    let self = {};
    let Cart = null;
    let Product = null;

    self.init = (product, cart) => {
        Cart = cart;
        Product = product;
    }

    self.run = async(opts) => {
        const serverProducts = await Product.fetchEvery();
        const clientProducts = await Cart.listArticles();
        const serverUUIDS = serverProducts.map(product => product._id);

        clientProducts.filter(product => serverUUIDS.includes(product._id))
        .map(product => {
            const id = product._id;
            let serverProduct = serverProducts.find(product => product._id === id);
            serverProduct.quantity = product.quantity;
            Cart.setArticleById(id, serverProduct);
        });

        const totalProducts = Cart.calculateQuantities();
        const selectedProduct = serverProducts.find(product => product._id === opts?.id);
        const minQuantitySelected = 1;
        const maxQuantitySelected = 99 - selectedProduct.quantity;

        return {
           serverProducts,
           totalProducts,
           selectedProduct,
           minQuantitySelected,
           maxQuantitySelected,
        }
    }
    return self;
})();

export default LoadPage