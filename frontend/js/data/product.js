/**
 * @author Bank Jordan <jordan.developper@outlook.com>
 * @description Class to manage relative to Product access data with user input validation
 */

import "../typedef/typedefs.js";
class Product {
    /**
     * Create a Command.
     * @param {request} RequestFactory - RequestFactory dependency
     * @param {validator} Validator - Validator dependancy
     * @param {error} CartError - Validator dependancy
     */
    constructor(request, validator, error) {
        this.RequestFactory = request;
        this.Validator = validator;
        this.CartError = error;
    }

    /**
     * Get Every Command from backend
     * @return {Command[]}
     */

    async fetchEvery() {
        const {RequestFactory} = this;
        let request = RequestFactory.get("getProducts");
        let jsonResponse = await request.send();
        return jsonResponse;
    }

    /**
     * Get Command by Id from backend
     * @return {Command[]}
     * @param {String} id - Id of product
     */
    
    async fetchById(id) {
        const {CartError} = this;
        CartError.errorID(id);
        let request = RequestFactory.get("getProductById");
        let jsonResponse = await request.send({id});
        return jsonResponse;
    }
}

export default Product;