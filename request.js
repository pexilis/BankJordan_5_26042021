class BodyRequest {
    constructor(method, url) {
        if (!["POST", "PUT", "PATCH"].includes(method))
            throw {error:"BODYREQUEST_ERROR"};

        this.method = method;
        this.url = url;
    }
}

class UrlRequest {
    constructor(method, url) {
        if (!["GET", "DELETE"].includes(method))
            throw {error:"URLREQUEST_ERROR"};

        this.method = method;
        this.url = url;
    }
}

class JSONBodyRequest extends BodyRequest {
    async send(body) {
        let response;
        let json;

        try{
            response = await fetch(this.url, {
                method:this.method,
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(body)
            });
        }catch(e){
            throw {error:"NETWORK_ERROR"};
        }

        if (response.status >= 400 && response.status < 500)
            throw {error:"CLIENT_ERROR"};
        if (response.status >= 500 && response.status < 600)
            throw {error:"SERVER_ERROR"};
        
        try{
            json = await response.json();
        }catch(e){
            throw {error:"JSON_ERROR"};
        }

        return json;
    }
}

export default {JSONBodyRequest, UrlRequest};