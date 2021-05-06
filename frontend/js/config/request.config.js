import Global from "./global.config.js";
import {JSONUrlRequest, JSONBodyRequest} from "../utils/Request.js";


const RequestFactory = (() => {
    let self = {};
    let requests = {};

    self.add = (name, request) => {
        requests[name] = request;
    }

    self.get = name => {
        return requests[name];
    }

    return self;
})();

(() => {
    RequestFactory.add("submitCart", new JSONBodyRequest("POST", `${Global.protocol}://${Global.hostname}:${Global.port}/api/${Global.typeData}/order`));
    RequestFactory.add("getProducts", new JSONUrlRequest("GET", `${Global.protocol}://${Global.hostname}:${Global.port}/api/${Global.typeData}`));
    RequestFactory.add("getProductById", new JSONUrlRequest("GET", `${Global.protocol}://${Global.hostname}:${Global.port}/api/${Global.typeData}/{id}`));
})();

export default RequestFactory;