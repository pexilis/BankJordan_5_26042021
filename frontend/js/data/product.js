const Product = (() => {
    let self = {};
    let RequestFactory = null; 
    let Validator = null;
    let CartError = null;


    self.init = (request, validator, error) => {
        RequestFactory = request;
        Validator = validator;
        CartError = error;
    }

    self.fetchEvery = async() => {
        let request = RequestFactory.get("getProducts");
        let jsonResponse = request.send();
        return jsonResponse;
    }

    self.fetchById = async(id) => {
        CartError.errorID(id);
        let request = RequestFactory.get("getProductById");
        let jsonResponse = request.send({id});

        jsonResponse.price = jsonResponse.price.toString();
        return jsonResponse;
    }

    return self;
})();

export default Product;