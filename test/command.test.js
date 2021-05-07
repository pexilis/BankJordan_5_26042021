import Global from "../frontend/js/config/global.config.js"
import "../frontend/js/config/localstorage.config.js"
import Validator from "../frontend/js/config/validator.config.js"

import LocalStorageAPI from "../frontend/js/utils/localStorageAPI.js";
import Command from "../frontend/js/data/command.js";
import CommandError from "../frontend/js/errors/CommandError.js";

CommandError.init(Validator);
Command.init(new LocalStorageAPI("command-storage"), CommandError);

let command = {
    "contact": {
        "firstName": "Jean",
        "lastName": "Claude",
        "city": "Moto",
        "address": "Chocolat",
        "email": "cco@coco.fr"
    },
    "products": [
        {
            "lenses": [
                "35mm 1.4",
                "50mm 1.6"
            ],
            "_id": "5be1ed3f1c9d44000030b061",
            "name": "Zurss 50S",
            "price": 49900,
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "imageUrl": "http://127.0.0.1:3000/images/vcam_1.jpg"
        }
    ],
    "orderId": "00433db0-ae9c-11eb-b437-7f8cee6dbf80"
}


describe("Add new command", () => {
    it("should throw an error on undefined command", () => {
        let error;

        try{
            Command.add(undefined);
        }catch(e){
            error = e;
        }

        expect(error).toEqual({error:"UNDEFINED_ERROR"});
    });

    it("should add the new command to local storage", () => {
        Command.add(command);

        const item = JSON.parse(localStorage.getItem("command-storage")); 

        expect(item).toEqual([command]);
    });
});

describe("Get Command By Id", () => {
    it("should throw an error on invalid id", () => {
        Command.add(command);
        let error;

        try{
            const item = Command.get("123");
        }catch(e){
            error = e;
        }

        expect(error).toEqual({error:"ERROR_FORMAT"});
    });

    it("should return the command by id", () => {
        Command.add(command);
        const newCommand = Command.get("00433db0-ae9c-11eb-b437-7f8cee6dbf80");

        expect(newCommand).toEqual(command);
    });
});