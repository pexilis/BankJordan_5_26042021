import Cart from "../cart";

describe("See all articles", () => {
    it("should throw an error when LocalStorage isn't initialized", () => {
        expect.assertions(1);
        return Cart.listArticles().catch(e => expect(e).toEqual({error:"INITIALIZATION_ERROR"}));
    });

    it("should return every articles when all is ok", () => {
        expect.assertions(1);
        localStorage.setItem("cart-storage", "[]");
        return Cart.listArticles().then(data => expect(typeof data === "object").toBe(true));
    });

    it("should return an error if only one of the items is invalid", () => {
        expect.assertions(1);
        let arrItem = [
            {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b061", 
                quantity:"100",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            },
            {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b062", 
                quantity:"100",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            },
            {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b063", 
                quantity:"100",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            },
            {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b064", 
                quantity:"100",
                price:"45",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            }
        ];

        localStorage.setItem("cart-storage", JSON.stringify(arrItem));
        return Cart.listArticles().catch(e => expect(e).toEqual({error:"FORMAT_ERROR"}));
    });
});

describe("Empty the cart", () => {
    it("should throw an error when the cart is empty", () => {
        let thrownError;
        try{
            localStorage.setItem("cart-storage", "[]");
            Cart.clearCart();
        }catch(error){
            thrownError = error;
        }

        expect(thrownError).toEqual({error:"EMPTY_ERROR"});
    });

    it("should throw an error when the cart isn't initialized", () => {
        let thrownError;
        try{
            localStorage.removeItem("cart-storage");
            Cart.clearCart();
        }catch(error){
            thrownError = error;
        }

        expect(thrownError).toEqual({error:"INITIALIZATION_ERROR"});
    });

    it("should empty the basket when everything is ok", () => {
            const dummyCart = [
                {
                    name:"teddy-red",
                    price:"1023$"
                },
                {
                    name:"teddy-red",
                    price:"1023$"
                }
            ];

            localStorage.setItem("cart-storage", JSON.stringify(dummyCart));
            Cart.clearCart();
            const array = JSON.parse(localStorage.getItem("cart-storage"));
            expect(array.length === 0).toBe(true);
    });
});

describe("Add article to cart", () => {
    it("should throw an error when the cart isn't initizalized", () => {
        let thrownError;
        try{
            localStorage.removeItem("cart-storage");
            Cart.addArticle();
        }catch(error){
            thrownError = error;
        }

        expect(thrownError).toEqual({error:"INITIALIZATION_ERROR"});
    });

    it("should throw an error when the uuid isn't proper format", () => {
        let thrownError;
        try{
            let dummyArticle = {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d440000", 
                quantity:"5",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            }

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
            let dummyArticle = {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b061", 
                quantity:"-8",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            }
            
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
            let dummyArticle = {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b061", 
                quantity:"100",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            }
            
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
            let dummyArticle = {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b061", 
                quantity:"5",
                price:"4555",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            }
            
            localStorage.setItem("cart-storage", "[]");
            Cart.addArticle(dummyArticle);
        }catch(error){
            thrownError = error;
        }

        expect(thrownError).toEqual({error:"FORMAT_ERROR"});
    });

    it("should throw an error when the imageURL isn't proper format", () => {
        let thrownError;
        try{
            let dummyArticle = {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b061", 
                quantity:"5",
                price:"455500",
                imageUrl:"http://localhost:3000/images/vam_1.jpg"
            }
            
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
        const id = "5be1ed3f1c9d44000030b061";
        const quantity = "50";

        let dummyArticle = {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b061", 
                quantity:"5",
                price:"455500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        };

        Cart.addArticle(dummyArticle);

        const arrArticle = JSON.parse(localStorage.getItem("cart-storage"));
        const article = arrArticle.find(article => article.id === id);

        expect(article).toEqual(dummyArticle);
    });

    it("update the cart with the new quantity added if the item already exists", () => {
        localStorage.setItem("cart-storage", "[]");
        const id = "5be1ed3f1c9d44000030b061";
        
        let dummyArticle = {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b061", 
                quantity:"10",
                price:"455500",
                imageUrl:"http://localhost:3000/images/vcam_123.jpg"
        };

        Cart.addArticle(dummyArticle);
        Cart.addArticle(dummyArticle);

        const arrArticle = JSON.parse(localStorage.getItem("cart-storage"));
        const article = arrArticle.find(article => article.id === id);

        expect(article.quantity).toEqual("20");
    });

    it("Return an error when the sum is not in the right format", () => {
        let thrownError;

        try{
            localStorage.setItem("cart-storage", "[]");
            const id = "5be1ed3f1c9d44000030b061";
        
            let dummyArticle = {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b061", 
                quantity:"90",
                price:"455500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            };

            Cart.addArticle(dummyArticle);
            Cart.addArticle(dummyArticle);
        }catch(e){
            thrownError = e;
        }
        
        expect(thrownError).toEqual({error:"ADD_ERROR"});
    });

    it("should update the price when everything is ok", () => {
        let firstArticle = {
            name:"foo",
            description:"my description",
            id:"5be1ed3f1c9d44000030b061", 
            quantity:"10",
            price:"455500",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        };

        let secondArticle = {
            name:"bar",
            description:"my description",
            id:"5be1ed3f1c9d44000030b062", 
            quantity:"15",
            price:"35200",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        };

        let thirdArticle = {
            name:"ber",
            description:"my description",
            id:"5be1ed3f1c9d44000030b063", 
            quantity:"13",
            price:"65600",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        };

        let result = [
            {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b061", 
                quantity:"20",
                price:"455500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg",
                calculatePrice:"91100"
            },
            {
                name:"bar",
                description:"my description",
                id:"5be1ed3f1c9d44000030b062", 
                quantity:"30",
                price:"35200",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg",
                calculatePrice:"10560"
            },
            {
                name:"ber",
                description:"my description",
                id:"5be1ed3f1c9d44000030b063", 
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
});

describe("Calculate total quantity", () => {
    it("should throw an error if the cart isn't initialized", () => {
        let errorThrown; 

        try{
            localStorage.removeItem("cart-storage");
            let total = Cart.calculateQuantities();
        }catch(e){
            errorThrown = e;
        }

        expect(errorThrown).toEqual({error:"INITIALIZATION_ERROR"});
    });

    

    it("should throw error if only one of the items is invalid", () => {
        let arrItem = [
            {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b061", 
                quantity:"100",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            },
            {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b062", 
                quantity:"100",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            },
            {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b063", 
                quantity:"100",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            },
            {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b064", 
                quantity:"100",
                price:"45",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            }
        ];

        let errorThrown;

        localStorage.setItem("cart-storage", JSON.stringify(arrItem));

        try{
            let total = Cart.calculateQuantities();
        }catch(e){
            errorThrown = e;
        }

        expect(errorThrown).toEqual({error:"FORMAT_ERROR"});
    });
});

describe("Calculate total price", () => {
    it("should throw an error if the cart isn't initialized", () => {
        let errorThrown; 

        try{
            localStorage.removeItem("cart-storage");
            let total = Cart.calculateTotalPrices();
        }catch(e){
            errorThrown = e;
        }

        expect(errorThrown).toEqual({error:"INITIALIZATION_ERROR"});
    });

    it("should throw error if only one of the items is invalid", () => {
        let arrItem = [
            {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b061", 
                quantity:"100",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            },
            {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b062", 
                quantity:"100",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            },
            {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b063", 
                quantity:"100",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            },
            {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b064", 
                quantity:"100",
                price:"45",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            }
        ];

        let errorThrown;

        localStorage.setItem("cart-storage", JSON.stringify(arrItem));

        try{
            let total = Cart.calculateTotalPrices();
        }catch(e){
            errorThrown = e;
        }

        expect(errorThrown).toEqual({error:"FORMAT_ERROR"});
    });
});
