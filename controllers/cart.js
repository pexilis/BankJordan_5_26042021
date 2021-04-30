const Cart = (() => {
    let self = {};

    const cartName = "cart-storage";
    let CartModel = null;
    let Validator = null;
    let RequestFactory = null;

    self.init = (model, validator, request) => {
        CartModel = model;
        Validator = validator;
        RequestFactory = request;
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

    self.setArticleById = (id, article) => {
        if (Validator.checkRegex({
            "uuid":id,
        }).valid === false)
            throw {error:"FORMAT_ERROR"};

        errorFormat(article);

        
        CartModel.removeItem(id);
        self.addArticle(article);

        return article;
    };

    self.getArticleById = id => {
        if (Validator.checkRegex({
            "uuid":id,
        }).valid === false)
            throw {error:"FORMAT_ERROR"};

        return CartModel.getById(id);
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
        let request = RequestFactory.get("submitCart");

        let result = await request.send({
            contact:submitForm,
            products
        });

        Cart.clearCart();
        return result;
    }

    return self;
})();

export default Cart;