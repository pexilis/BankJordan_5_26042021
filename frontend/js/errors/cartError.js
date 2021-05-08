const CartError = (() => {
    let self = {};
    let Validator = null;
    let CartModel = null;

    self.init = (validator, model) => {
        Validator = validator;
        CartModel = model;
    }

    self.errorFormat = article => {
        const objCheck = Validator.checkRegex({
            "uuid":article._id,
            "quantity":article.quantity,
            "price":article.price
        });

        if (objCheck.valid === false) 
            throw {error:"FORMAT_ERROR"};
    }

    self.errorSubmit = submitForm => {
        const checkObj = Validator.checkRegex({
            "name":[submitForm.firstName, submitForm.lastName],
            "city":submitForm.city,
            "address":submitForm.address,
            "email":submitForm.email
        });

        if (!checkObj.valid)
            throw {error:"FORMAT_ERROR"};
    }
    
    self.errorProducts = _ => {
        const articles = CartModel.getArray();
        
        for (let i = 0 ; i < articles.length ; i++) {
            const uuid = articles[i]._id;
            const result = Validator.checkRegex({"uuid":uuid});
            if (!result.valid){
                throw {error:"FORMAT_ERROR"};
            }
        }
    }

    self.errorID = id => {
        if (Validator.checkRegex({
            "uuid":id
        }).valid === false)
            throw {error:"FORMAT_ERROR"};
    }

    return self;
})();

export default CartError;