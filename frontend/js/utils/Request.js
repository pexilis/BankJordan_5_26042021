import urlParser from "./UrlParser.js";
import JSONManip from "./JSONManip.js";


const genericSend = async(url, method, headers, body=undefined) => {
    let response;
    try{
        if (["GET", "DELETE"].includes(method))
            response = await fetch(url, {
                method,
                headers,
        });

        if (["POST", "PUT", "PATCH"].includes(method))
            response = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(body)
            });
            
    }catch(e){
        console.log(e);
        throw {error:"NETWORK_ERROR"};
    }

    if (response.status >= 400 && response.status < 500)
        throw {error:"CLIENT_ERROR"};
    if (response.status >= 500 && response.status < 600)
        throw {error:"SERVER_ERROR"};
    
    return response;
}

class BodyRequest {
    constructor(method, url) {
        if (!["POST", "PUT", "PATCH"].includes(method))
            throw {error:"BODYREQUEST_ERROR"};

        this.method = method;
        this.url = url;
    }
}

class UrlRequest {
    constructor(method, urlTemplate) {
        if (!["GET", "DELETE"].includes(method))
            throw {error:"URLREQUEST_ERROR"};

        this.method = method;
        this.url = urlTemplate;
    }
}

class JSONUrlRequest extends UrlRequest{
    async send(data) {
        let response;
        let json;
        let url = urlParser(this.url, data);

        console.log(url);

        response = await genericSend(url, this.method, {
            "Accept":"application/json"
        }, data);

        return JSONManip.genericJSON(response);
    }
}

class JSONBodyRequest extends BodyRequest {
    async send(body) {
        let response;
        let json;

        response = await genericSend(this.url, this.method, {
            "Content-Type":"application/json"
        }, body);

        return JSONManip.genericJSON(response);
    }
}

export {JSONBodyRequest, JSONUrlRequest};