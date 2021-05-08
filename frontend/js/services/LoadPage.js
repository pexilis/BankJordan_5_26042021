import Global from "../config/global.config.js";

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

    self.cart = async() => {
        const clientProducts = await Cart.listArticles();
        const totalPrice = CartCalculate.totalPrices();

        return {
            clientProducts,
            totalPrice
        };
    }

    self.index = async() => {
        const serverProducts = await Product.fetchEvery();
        return {
            serverProducts
        };
    }

    self.header = async() => {
        const totalProducts = CartCalculate.quantities();
    
        return {
            totalProducts
        };
    }

    self.article = async(id) => {
        const selectedProduct = await Product.fetchById(id);
        const selectedProductCart = await Cart.getArticleById(id);
        let maxQuantitySelected;
        let cartQuantity;
        

        if (selectedProductCart){
            cartQuantity = Number.parseInt(selectedProductCart.quantity);
            maxQuantitySelected = Global.maxQuantityCart - cartQuantity;
        }else{
            maxQuantitySelected = Global.maxQuantityCart
        }

        return {
            maxQuantitySelected,
            selectedProduct,
        };
    }

    return self;
})();

export default LoadPage