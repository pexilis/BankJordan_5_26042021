import LocalStorageModel from "./localStorageModel.js";
import Validator from "./Validator.js";
import BodyJSONRequest from "./request.js";

const Cart = (() => {
    let self = {};

    const cartName = "cart-storage";
    let CartModel = null;

    self.init = newAPI => {
        CartModel = newAPI;
    }

    self.listArticles = async() => {
        let result = CartModel.getArray();
        result.map(article => errorFormat(article));
        return Promise.resolve(result);
    }

    const errorFormat = article => {
        const objCheck = Validator.checkRegex({
            "uuid":article.id,
            "quantity":article.quantity,
            "price":article.price,
            "url":article.imageUrl,
        });

        if (objCheck.valid === false) 
            throw {error:"FORMAT_ERROR"};
    }

    const calculateQuantity = (old_quantity, new_quantity) => {
        return old_quantity + new_quantity;
    }

    self.clearCart = _ => {
        CartModel.clearArray();
    }

    const errorSubmit = submitForm => {
        const checkObj = Validator.checkRegex({
            "name":[submitForm.firstName, submitForm.lastName],
            "city":submitForm.city,
            "address":submitForm.address,
            "email":submitForm.email
        });

        if (!checkObj.valid)
            throw {error:"FORMAT_ERROR"};
    }
    
    const errorProducts = _ => {
        const articles = CartModel.getArray();
        
        for (let i = 0 ; i < articles.length ; i++) {
            const uuid = articles[i].id;
            const result = Validator.checkRegex({"uuid":uuid});
            if (!result.valid){
                throw {error:"FORMAT_ERROR"};
            }
        }
    }

    const updateArticleWithNewQuantity = (old, article) => {
        const new_quantity = calculateQuantity
                            (
                                Number.parseInt(old.quantity), 
                                Number.parseInt(article.quantity)
                            )
                           .toString();

        article.quantity = new_quantity;
        updatePaidPrice(article);

        try{
            errorFormat(article);
        }catch(e){
            throw {error:"ADD_ERROR"};
        }

        CartModel.setById(article.id, article);
    }

    const updatePaidPrice = article => {
        const quantity = Number.parseInt(article.quantity, 10);
        const price = Number.parseInt(article.price.slice(0, -2));
        const updated_price = quantity * price;
        article.calculatePrice = updated_price.toString();
    }

    self.addArticle = article => {
        errorFormat(article);

        const old = CartModel.getById(article.id);
        
        if (old){
            updateArticleWithNewQuantity(old, article);
        }else{
            updatePaidPrice(article);
            CartModel.addItem(article);
        }

        return CartModel.getById(article.id);
    }

    self.calculateQuantities = _ => {
        const arrArticle = CartModel.getArray();
        const quantities = [];

        if (arrArticle.length === 0)
            return 0;

        arrArticle.map(article => {
            errorFormat(article);
            const quantity = Number.parseInt(article.quantity);
            quantities.push(quantity);
        });

        return quantities.reduce((old, curr) => old + curr);
    }

    self.calculateTotalPrices = _ => {
        const arrArticle = CartModel.getArray();
        const paidPrices = [];

        arrArticle.map(article => {
            errorFormat(article);
            const paidPrice = Number.parseInt(article.calculatePrice, 10);
            paidPrices.push(paidPrice);
        });

        return paidPrices.reduce((old, next) => old + next);
    }

    self.removeArticle = (id) => {
        if (Validator.checkRegex({
            "uuid":id
        }).valid === false)
            throw {error:"FORMAT_ERROR"};

        let article = CartModel.getById(id);
        CartModel.removeItem(id);

        return article;
    }

    const serializeProducts = async() => {
        let articles = await Cart.listArticles();
        let products = [];

        articles.map(article => {
            const quantity = Number.parseInt(article.quantity);
            const uuid = article.id;
            for (let i = 0 ; i < quantity ; i++){
                products.push(uuid);
            }
        })

        return products;
    }

    self.submit = async(submitForm) => {
        errorSubmit(submitForm);
        errorProducts();
        
        const products = await serializeProducts();
        const request = new BodyJSONRequest("POST", "http://127.0.0.1:3000/api/cameras/order");


        let result = await request.send({
            contact:submitForm,
            products
        });

        Cart.clearCart();
        return result;
    }

    return self;
})();

(() => {
    Cart.init(new LocalStorageModel("cart-storage"));

    Validator.addRegex("uuid", /^[0-9a-z]{24}$/);
    Validator.addRegex("quantity", /^[0-9]{1,2}$/);
    Validator.addRegex("price", /^[0-9]{1,}00$/);
    Validator.addRegex("url", /^http:\/\/localhost:3000\/images\/vcam_[0-9]{1,}\.jpg$/);
    Validator.addRegex("name", /^[a-zA-Z]{3,25}$/);
    Validator.addRegex("city", /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/);
    Validator.addRegex("address", /^[0-9]{1,2}[a-zA-Z ]{2,45}$/);
    Validator.addRegex("email", /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
})();

export default Cart;