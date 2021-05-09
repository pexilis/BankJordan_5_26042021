import Global from "../config/global.config.js";
class LoadPage {
    constructor(product, cart, calcul) {
        this.Cart = cart;
        this.Product = product;
        this.CartCalculate = calcul;
    }

    async cart() {
        const {Cart, CartCalculate} = this;
        const clientProducts = await Cart.listArticles();
        const totalPrice = CartCalculate.totalPrices();

        return {
            clientProducts,
            totalPrice
        };
    }

    async index() {
        const {Product} = this;
        const serverProducts = await Product.fetchEvery();
        return {
            serverProducts
        };
    }

    async header() {
        const {CartCalculate} = this;
        const totalProducts = CartCalculate.quantities();
    
        return {
            totalProducts
        };
    }

    async article(id) {
        const {Product, Cart} = this;
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

}

export default LoadPage