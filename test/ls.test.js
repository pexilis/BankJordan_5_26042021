import localStorageModel from "../localStorageModel";

describe("Model Error Handling", () => {
    it("should throw an error initialization (getArray)", () => {
        let error;
        try{
            const model = new localStorageModel("test");
            model.getArray();
        }catch(e){
            error = e;
        }

        expect(error).toEqual({error:"INITIALIZATION_ERROR"});
    });

    it("should throw an error initialization (isEmpty)", () => {
        let error;
        try{
            const model = new localStorageModel("test");
            model.isEmpty();
        }catch(e){
            error = e;
        }

        expect(error).toEqual({error:"INITIALIZATION_ERROR"});
    });

    it("should throw an error initialization (clearArray)", () => {
        let error;
        try{
            const model = new localStorageModel("test");
            model.clearArray();
        }catch(e){
            error = e;
        }

        expect(error).toEqual({error:"INITIALIZATION_ERROR"});
    });

    it("should throw an error initialization (getById)", () => {
        let error;
        try{
            const model = new localStorageModel("test");
            model.getById();
        }catch(e){
            error = e;
        }

        expect(error).toEqual({error:"INITIALIZATION_ERROR"});
    });
    
    it("should throw an error initialization (setById)", () => {
        let error;
        try{
            const model = new localStorageModel("test");
            model.setById();
        }catch(e){
            error = e;
        }

        expect(error).toEqual({error:"INITIALIZATION_ERROR"});
    }); 
});

describe("Remove article from cart", () => {
    it("should throw an error when cart isn't initialized", () => {
        let thrownError; 

        try{
            const id = "123456";
            const Model = new localStorageModel("storage-name");
            Model.removeItem(id);
        }catch(e){
            thrownError = e;
        }

        expect(thrownError).toEqual({error:"INITIALIZATION_ERROR"});
    });

    it("should throw an error when the cart is empty", () => {
        let thrownError; 

        try{
            localStorage.setItem("test", "[]");
            const modelTest = new localStorageModel("test");
            modelTest.removeItem(1234);
        }catch(e){
            thrownError = e;
        }

        expect(thrownError).toEqual({error:"EMPTY_ERROR"});
    });

    it("should throw an error when id doesn't exist", () => {
        let thrownError;
        
        try{
            const modelTest = new localStorageModel("test");
            localStorage.setItem("test", "[]");

            modelTest.addItem({
                id:"123456",
                name:"foo"
            });

            modelTest.removeItem("123455");
        }catch(e){
            thrownError = e;
        }

        expect(thrownError).toEqual({error:"ACCESS_ERROR"});
    });

    it("should remove item when everything is ok", () => {
        localStorage.setItem("test", "[]");
        const model = new localStorageModel("test");

        model.addItem({
            id:"1234",
            name:"foo"
        });

        model.addItem({
            id:"1235",
            name:"bar"
        });

        model.addItem({
            id:"1236",
            name:"bi"
        });

        model.removeItem("1234");

        expect(model.getArray()).toEqual([
            {
                id:"1235",
                name:"bar"
            },
            {
                id:"1236",
                name:"bi"
            }
        ]);
    });
});

describe("Add article from cart", () => {
    it("should add article to cart", () => {
        let article = {
            name:"toto",
            lastname:"tutu"
        }

        localStorage.setItem("test", "[]");
        const model = new localStorageModel("test");
        model.addItem(article);

        expect(model.getArray()).toEqual([
            article
        ]);
    });
});

describe("Clear LocalStorage", () => {
    it("should replace localStorage by empty array", () => {
        localStorage.setItem("test", "[]");
        let model = new localStorageModel("test");

        model.addItem({name:"toto", id:"1234"});
        model.addItem({name:"tutu", id:"1236"});

        model.clearArray();

        const array = model.getArray();

        expect(array).toEqual([]);
    });
})
