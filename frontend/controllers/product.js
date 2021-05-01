const Product = (() => {
    let self = {};
    let RequestFactory = null; 
    let Validator = null;


    self.init = (request, validator) => {
        RequestFactory = request;
        Validator = validator;
    }

    

    

    self.fetchEvery = async() => {
        let request = RequestFactory.get("getProducts");
        let jsonResponse = request.send();
        return jsonResponse;
    }

    self.fetchById = async(id) => {
        if (Validator.checkRegex({
            "uuid":id
        }).valid === false)
            throw {error:"FORMAT_ERROR"};
        
        let request = RequestFactory.get("getProductById");
        let jsonResponse = request.send({id});

        jsonResponse.price = jsonResponse.price.toString();
        return jsonResponse;
    }

    return self;
})();

export default Product;