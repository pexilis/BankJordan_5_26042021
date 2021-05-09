class Product {
    constructor(request, validator, error) {
        this.RequestFactory = request;
        this.Validator = validator;
        this.CartError = error;
    }

    
    async fetchEvery() {
        const {RequestFactory} = this;
        let request = RequestFactory.get("getProducts");
        let jsonResponse = await request.send();
        return jsonResponse;
    }

    async fetchById(id) {
        const {CartError} = this;
        CartError.errorID(id);
        let request = RequestFactory.get("getProductById");
        let jsonResponse = await request.send({id});
        return jsonResponse;
    }
}

export default Product;