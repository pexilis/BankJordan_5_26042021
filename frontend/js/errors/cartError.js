class CartError{
    constructor(validator, model) {
        this.Validator = validator;
        this.CartModel = model;
    }

    errorFormat(article) {
        const {Validator} = this;

        const objCheck = Validator.checkRegex({
            "uuid":article._id,
            "quantity":article.quantity,
            "price":article.price
        });

        if (objCheck.valid === false) 
            throw {error:"FORMAT_ERROR"};
    }

    errorSubmit(submitForm) {
        const {Validator} = this;

        const checkObj = Validator.checkRegex({
            "name":[submitForm.firstName, submitForm.lastName],
            "city":submitForm.city,
            "address":submitForm.address,
            "email":submitForm.email
        });

        if (!checkObj.valid)
            throw {error:"FORMAT_ERROR"};
    }
    
    errorProducts() {
        const {CartModel, Validator} = this;
        const articles = CartModel.getArray();

        for (let i = 0 ; i < articles.length ; i++) {
            const uuid = articles[i]._id;
            const result = Validator.checkRegex({"uuid":uuid});
            if (!result.valid) throw {error:"FORMAT_ERROR"};
        }
    }

    errorID(id) {
        const {Validator} = this;
        if (Validator.checkRegex({
            "uuid":id
        }).valid === false)
            throw {error:"FORMAT_ERROR"};
    }
}

export default CartError;