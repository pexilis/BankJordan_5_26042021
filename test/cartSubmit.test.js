import LocalStorageAPI from "../frontend/js/utils/localStorageAPI.js";
import ConfigValidator from "../frontend/js/config/validator.config.js";
import RequestFactory from "../frontend/js/config/request.config.js";

import CartError from "../frontend/js/errors/cartError.js";
import Cart from "../frontend/js/data/cart.js";
import CartSubmit from "../frontend/js/actions/cartSubmit.js";

import * as Utils from "./utils.js";

const cartModel = new LocalStorageAPI("cart-storage");
const cartError = new CartError(ConfigValidator, cartModel);
const cart = new Cart(cartModel, RequestFactory, cartError);
const cartSubmit = new CartSubmit(cart);


describe("Submit cart to server", () => {
    it("should send an error when firstName isn't valid", () => {
        expect.assertions(1);
        let submitForm = Utils.generateDummyForm();
        submitForm.firstName = "!Arnaud*5"
        return cartSubmit.submit(submitForm).catch(error => expect(error).toEqual({error:"FORMAT_ERROR"}));
    });

    it("should send an error when lastName isn't valid", () => {
        expect.assertions(1);
        let submitForm = Utils.generateDummyForm();
        submitForm.lastName = "!Arno"
        return cartSubmit.submit(submitForm).catch(error => expect(error).toEqual({error:"FORMAT_ERROR"}));
    });

    it("should send an error when city isn't valid", () => {
        expect.assertions(1);
        let submitForm = Utils.generateDummyForm();
        submitForm.city = "!Paris"
        return cartSubmit.submit(submitForm).catch(error => expect(error).toEqual({error:"FORMAT_ERROR"}));
    });

    it("should send an error when address isn't valid", () => {
        expect.assertions(1);
        let submitForm = Utils.generateDummyForm();
        submitForm.address = "rue des tomates"
        return cartSubmit.submit(submitForm).catch(error => expect(error).toEqual({error:"FORMAT_ERROR"}));
    });

    it("should send an error when email isn't valid", () => {
        expect.assertions(1);
        let submitForm = Utils.generateDummyForm();
        submitForm.email = "fakemeil@ttt"
        return cartSubmit.submit(submitForm).catch(error => expect(error).toEqual({error:"FORMAT_ERROR"}));
    });

    it("should send an error when one product isn't valid", () => {
        expect.assertions(1);
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
            _id:"5be1ed3f1c9d44000030b06", 
            quantity:"13",
            price:"65600",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        };

        let submitForm = Utils.generateDummyForm();

        localStorage.setItem("cart-storage", "[]");
        localStorage.setItem("cart-storage", JSON.stringify([
            firstArticle,
            secondArticle,
            thirdArticle
        ]))

        
        return cartSubmit.submit(submitForm).catch(error => expect(error).toEqual({error:"FORMAT_ERROR"}));
    });
});