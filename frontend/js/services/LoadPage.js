const LoadPage = (() => {
    let self = {};
    let Cart = null;
    let CartCalculate = null;
    let Product = null;

    self.init = (product, cart, calcul) => {
        Cart = cart;
        Product = product;
        CartCalculate = calcul;
    }

    self.run = async(opts) => {
        const serverProducts = await Product.fetchEvery();
        let clientProducts = await Cart.listArticles();
        const serverUUIDS = serverProducts.map(product => product._id);

        clientProducts.filter(product => serverUUIDS.includes(product._id))
        .map(product => {
            const id = product._id;
            let serverProduct = serverProducts.find(product => product._id === id);
            serverProduct.quantity = product.quantity;
            Cart.setArticleById(id, serverProduct);
        });

        const totalProducts = CartCalculate.quantities();
        const selectedProduct = serverProducts.find(product => product._id === opts?.id);
        const minQuantitySelected = 1;
        let maxQuantitySelected;

        if (selectedProduct?.quantity){
            maxQuantitySelected = 99 - Number.parseInt(selectedProduct?.quantity);
        }else{
            maxQuantitySelected = 99;
        }
            
        clientProducts = await Cart.listArticles();
        const totalPrice = CartCalculate.totalPrices();

        return {
           clientProducts,
           serverProducts,
           totalProducts,
           selectedProduct,
           minQuantitySelected,
           maxQuantitySelected,
           totalPrice
        }
    }
    return self;
})();

export default LoadPage