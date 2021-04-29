import {JSONBodyRequest, UrlRequest} from "../request.js";

describe("Request", () => {
    it("should throw error on invalid BodyRequest method", () => {
        let error;
        try{
            const request = new JSONBodyRequest("TOTO", "https://google.com");
        }catch(e){
            error = e;
        }

        expect(error).toEqual({error:"BODYREQUEST_ERROR"});
    });
});