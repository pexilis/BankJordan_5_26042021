import LocalStorageAPI from "../frontend/js/utils/localStorageAPI.js";
import ConfigValidator from "../frontend/js/config/validator.config.js";
import RequestFactory from "../frontend/js/config/request.config.js";

import CartError from "../frontend/js/errors/cartError.js";
import Cart from "../frontend/js/data/cart.js";

import * as Utils from "./utils.js";

const cartModel = new LocalStorageAPI("cart-storage");

CartError.init(ConfigValidator, cartModel);
Cart.init(cartModel, RequestFactory, CartError);

describe("See all articles", () => {
    it("should return every articles when all is ok", () => {
        expect.assertions(1);
        localStorage.setItem("cart-storage", "[]");
        return Cart.listArticles().then(data => expect(typeof data === "object").toBe(true));
    });

    it("should return an error if only one of the items is invalid", () => {
        return Cart.listArticles().catch(e => expect(e).toEqual({error:"FORMAT_ERROR"}));        expect.assertions(1);
        let arrItem = generateArrItem();
        arrItem[0].quantity = "1000";

        localStorage.setItem("cart-storage", JSON.stringify(arrItem));

    });
});

describe("Add article to cart", () => {
    it("should throw an error when the uuid isn't proper format", () => {
        let thrownError;
        try{
            let dummyArticle = Utils.generateArticle();
            dummyArticle._id = "1234";
            localStorage.setItem("cart-storage", "[]");
            Cart.addArticle(dummyArticle);
        }catch(error){
            thrownError = error;
        }

        expect(thrownError).toEqual({error:"FORMAT_ERROR"});
    });

    it("should throw an error when the quantity is negative", () => {
        let thrownError;
        try{
            let dummyArticle = Utils.generateArticle();
            dummyArticle.quantity = "-100";
            localStorage.setItem("cart-storage", "[]");
            Cart.addArticle(dummyArticle);
        }catch(error){
            thrownError = error;
        }

        expect(thrownError).toEqual({error:"FORMAT_ERROR"});
    });

    it("should throw an error when the quantity is higher than 99", () => {
        let thrownError;
        try{
            let dummyArticle = Utils.generateArticle();
            dummyArticle.quantity = "100";
            localStorage.setItem("cart-storage", "[]");
            Cart.addArticle(dummyArticle);
        }catch(error){
            thrownError = error;
        }

        expect(thrownError).toEqual({error:"FORMAT_ERROR"});
    });

    it("should throw an error when the price isn't proper format", () => {
        let thrownError;
        try{
            let dummyArticle = Utils.generateArticle();
            dummyArticle.price = "4555";
            localStorage.setItem("cart-storage", "[]");
            Cart.addArticle(dummyArticle);
        }catch(error){
            thrownError = error;
        }

        expect(thrownError).toEqual({error:"FORMAT_ERROR"});
    });

    it("should throw an error when the article isn't proper format", () => {
        let thrownError;
        try{
            let dummyArticle = {
                toto:"5be1ed3f1c9d44000030b061", 
                tutu:"100"
            }
            
            localStorage.setItem("cart-storage", "[]");
            Cart.addArticle(dummyArticle);
        }catch(error){
            thrownError = error;
        }

        expect(thrownError).toEqual({error:"FORMAT_ERROR"});
    });

    it("should add article when article doesn't exist", () => {
        localStorage.setItem("cart-storage", "[]");
        let dummyArticle = Utils.generateArticle();
        Cart.addArticle(dummyArticle);

        const arrArticle = JSON.parse(localStorage.getItem("cart-storage"));
        const article = arrArticle.find(article => article._id === dummyArticle._id);

        expect(article).toEqual(dummyArticle);
    });

    it("update the cart with the new quantity added if the item already exists", () => {
        localStorage.setItem("cart-storage", "[]");
         
        let dummyArticle = Utils.generateArticle();

        Cart.addArticle(dummyArticle);
        Cart.addArticle(dummyArticle);

        const arrArticle = JSON.parse(localStorage.getItem("cart-storage"));
        const article = arrArticle.find(article => article._id === dummyArticle._id);

        expect(article.quantity).toEqual("10");
    });

    it("Return an error when the sum is not in the right format", () => {
        let thrownError;
        localStorage.setItem("cart-storage", "[]");

        try{
            let dummyArticle = Utils.generateArticle();

            for (let i = 0 ; i < 55 ; i++) {
                Cart.addArticle(dummyArticle);
            }
        }catch(e){
            thrownError = e;
        }
        
        expect(thrownError).toEqual({error:"ADD_ERROR"});
    });

    it("should update the price when everything is ok", () => {
        let firstArticle = {
            name:"foo",
            description:"my description",
            _id:"5be1ed3f1c9d44000030b061", 
            quantity:"10",
            price:"455500",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        };

        let secondArticle = {
            name:"bar",
            description:"my description",
            _id:"5be1ed3f1c9d44000030b062", 
            quantity:"15",
            price:"35200",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        };

        let thirdArticle = {
            name:"ber",
            description:"my description",
            _id:"5be1ed3f1c9d44000030b063", 
            quantity:"13",
            price:"65600",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        };

        let result = [
            {
                name:"foo",
                description:"my description",
                _id:"5be1ed3f1c9d44000030b061", 
                quantity:"20",
                price:"455500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg",
                calculatePrice:"91100"
            },
            {
                name:"bar",
                description:"my description",
                _id:"5be1ed3f1c9d44000030b062", 
                quantity:"30",
                price:"35200",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg",
                calculatePrice:"10560"
            },
            {
                name:"ber",
                description:"my description",
                _id:"5be1ed3f1c9d44000030b063", 
                quantity:"26",
                price:"65600",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg",
                calculatePrice:"17056"
            }
        ];

        localStorage.setItem("cart-storage", "[]");
        Cart.addArticle(firstArticle);
        Cart.addArticle(firstArticle);
        Cart.addArticle(secondArticle);
        Cart.addArticle(secondArticle);
        Cart.addArticle(thirdArticle);
        Cart.addArticle(thirdArticle);

        
        return Cart.listArticles().then(data => expect(data).toEqual(result));
    });

    it("should return added article", () => {
        localStorage.setItem("cart-storage", "[]");
        let article = Utils.generateArticle();

        const result = Cart.addArticle(article);

        expect(result).toEqual(article);
    });

    it ("should remove article when quantity is 0", () => {
        localStorage.setItem("cart-storage", "[]");
        let article = Utils.generateArticle();
    });
});

describe("Set article by id", () => {
    it ("should throw error on bad uuid format", () => {
        const article = Utils.generateArticle();
        let error;

        localStorage.setItem("cart-storage", "[]");
        Cart.addArticle(article);
        
        article.price = "5600";

        try{
            Cart.setArticleById("123", article);
        }catch(e){
            error = e;
        }

        expect(error).toEqual({error:"FORMAT_ERROR"});
    });

    it ("should update when everything is ok", () => {
        const article = Utils.generateArticle();
        let error;

        localStorage.setItem("cart-storage", "[]");
        Cart.addArticle(article);
        article.price = "5600";

        Cart.setArticleById(article._id, article);
    });

    it("should throw an error on invalid article", () => {
        const article = Utils.generateArticle();
        let error;

        localStorage.setItem("cart-storage", "[]");
        Cart.addArticle(article);
        article.price = "56";

        try{
            Cart.setArticleById(article._id, article);
        }catch(e){
            error = e;
        }

        expect(error).toEqual({error:"FORMAT_ERROR"});
    });

});

describe("Get article by id", () => {
    it("should throw an error on bad id", () => {
        const article = Utils.generateArticle();
        let error;
        localStorage.setItem("cart-storage", "[]");
        Cart.addArticle(article);

        try{
            let article = Cart.getArticleById("123");
        }catch(e){
            error = e;
        }

        expect(error).toEqual({error:"FORMAT_ERROR"});
    });

    it("should return article", () => {
        const article = Utils.generateArticle();
        let error;
        localStorage.setItem("cart-storage", "[]");
        Cart.addArticle(article);
        
        expect(Cart.getArticleById(article._id)).toEqual(article);
    });
});

describe("Remove article controller", () => {
    it("should throw an error on invalid id", () => {
        let error;
        try{
            localStorage.setItem("cart-storage", "[]");
            Cart.addArticle({
                name:"foo",
                description:"my description",
                _id:"5be1ed3f1c9d44000030b061", 
                quantity:"10",
                price:"455500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            });
            Cart.removeArticle("123");
        }catch(e){
            error = e;
        }

        expect(error).toEqual({error:"FORMAT_ERROR"});
    });

    it("should return added article", () => {
        localStorage.setItem("cart-storage", "[]");
        let article = Utils.generateArticle();

        Cart.addArticle(article);
        const result = Cart.removeArticle(article._id);

        expect(result).toEqual(article);
    });
});