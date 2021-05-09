import LocalStorageAPI from "../frontend/js/utils/localStorageAPI.js";
import ConfigValidator from "../frontend/js/config/validator.config.js";
import RequestFactory from "../frontend/js/config/request.config.js";

import CartError from "../frontend/js/errors/cartError.js";
import Cart from "../frontend/js/data/cart.js";
import CartCalculate from "../frontend/js/actions/cartCalculate.js"

import * as Utils from "./utils.js";

const cartModel = new LocalStorageAPI("cart-storage");
const cartError = new CartError(ConfigValidator, cartModel);
const cart = new Cart(cartModel, RequestFactory, cartError);
const cartCalculate = new CartCalculate(cart);

describe("Calculate total quantity", () => {
    it("should throw error if only one of the items is invalid", () => {
        let errorThrown;
        let arrItem = Utils.generateArrItem();
        arrItem[0].quantity = "-5";

        try{
            localStorage.setItem("cart-storage", JSON.stringify(arrItem));
            let total = cartCalculate.quantities();
        }catch(e){
            errorThrown = e;
        }

        expect(errorThrown).toEqual({error:"FORMAT_ERROR"});
    });

    it("should return total quantity when everything is ok", () => {
        let arrItem = Utils.generateArrItem();
        localStorage.setItem("cart-storage", JSON.stringify(arrItem));
        const totalPrice = cartCalculate.quantities();
        expect(totalPrice).toBe(181);
    });

    it("should return 0 for empty cart", () => {
        localStorage.setItem("cart-storage", "[]");
        expect(cartCalculate.quantities()).toEqual(0);
    });
});

describe("Calculate total price", () => {
    it("should throw error if only one of the items is invalid", () => {
        let arrItem = [
            {
                name:"foo",
                description:"my description",
                _id:"5be1ed3f1c9d44000030b061", 
                quantity:"100",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            },
            {
                name:"foo",
                description:"my description",
                _id:"5be1ed3f1c9d44000030b062", 
                quantity:"100",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            },
            {
                name:"foo",
                description:"my description",
                _id:"5be1ed3f1c9d44000030b063", 
                quantity:"100",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            },
            {
                name:"foo",
                description:"my description",
                _id:"5be1ed3f1c9d44000030b064", 
                quantity:"100",
                price:"45",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            }
        ];

        let errorThrown;

        localStorage.setItem("cart-storage", JSON.stringify(arrItem));

        try{
            let total = cartCalculate.totalPrices();
        }catch(e){
            errorThrown = e;
        }

        expect(errorThrown).toEqual({error:"FORMAT_ERROR"});
    });

    it("should return total price", () => {
        let itemOne = {
            name:"foo",
            description:"my description",
            _id:"5be1ed3f1c9d44000030b061", 
            quantity:"20",
            price:"1200",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        }

        let itemTwo = {
            name:"foo",
            description:"my description",
            _id:"5be1ed3f1c9d44000030b062", 
            quantity:"30",
            price:"12500",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        }

        let itemThree = {
            name:"foo",
            description:"my description",
            _id:"5be1ed3f1c9d44000030b063", 
            quantity:"40",
            price:"120500",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        }

        localStorage.setItem("cart-storage", "[]");
        cart.addArticle(itemOne);
        cart.addArticle(itemTwo);
        cart.addArticle(itemThree);
        cart.addArticle(itemThree);

        const total = cartCalculate.totalPrices();
        expect(total).toEqual(20*12 + 30*125 + 80*1205);
        

    });
});

