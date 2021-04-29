import Cart from "../cart";

const generateArticle = _ => {
    return  {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b062", 
                quantity:"5",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            };   
}

const generateArticleWithNegativeQuantity = _ => {
    return  {
                name:"foo",
                description:"my description",
                id:"5be1ed3f1c9d44000030b061", 
                quantity:"-5",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            };   
}

const generateDummyProducts = _ => {
    return [
        "5be1ed3f1c9d44000030b061",
        "5be1ef211c9d44000030b062"
    ];
}

const generateArrItem = _ => {
    return [
        {
            name:"foo",
            description:"my description",
            id:"5be1ed3f1c9d44000030b061", 
            quantity:"85",
            price:"4500",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        },
        {
            name:"foo",
            description:"my description",
            id:"5be1ed3f1c9d44000030b062", 
            quantity:"54",
            price:"4500",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        },
        {
            name:"foo",
            description:"my description",
            id:"5be1ed3f1c9d44000030b062", 
            quantity:"22",
            price:"4500",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        },
        {
            name:"foo",
            description:"my description",
            id:"5be1ed3f1c9d44000030b062", 
            quantity:"20",
            price:"4500",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        }
    ]
}

const generateDummyForm = _ => {
    return {
        firstName:"Jean",
        lastName:"Petit",
        address:"45 rue des tomates",
      city:"Toronto",
        email:"totototo@gmail.com"
    }
}

describe("See all articles", () => {
    it("should return every articles when all is ok", () => {
        expect.assertions(1);
        localStorage.setItem("cart-storage", "[]");
        return Cart.listArticles().then(data => expect(typeof data === "object").toBe(true));
    });

    it("should return an error if only one of the items is invalid", () => {
        expect.assertions(1);
        let arrItem = generateArrItem();
        arrItem[0].quantity = "1000";

        localStorage.setItem("cart-storage", JSON.stringify(arrItem));
        return Cart.listArticles().catch(e => expect(e).toEqual({error:"FORMAT_ERROR"}));
    });
});

describe("Add article to cart", () => {
    it("should throw an error when the uuid isn't proper format", () => {
        let thrownError;
        try{
            let dummyArticle = generateArticle();
            dummyArticle.id = "1234";
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
            let dummyArticle = generateArticle();
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
            let dummyArticle = generateArticle();
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
            let dummyArticle = generateArticle();
            dummyArticle.price = "4555";
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
            let dummyArticle = generateArticle();
            dummyArticle.imageUrl = "fake.com";
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
        let dummyArticle = generateArticle();
        Cart.addArticle(dummyArticle);

        const arrArticle = JSON.parse(localStorage.getItem("cart-storage"));
        const article = arrArticle.find(article => article.id === dummyArticle.id);

        expect(article).toEqual(dummyArticle);
    });

    it("update the cart with the new quantity added if the item already exists", () => {
        localStorage.setItem("cart-storage", "[]");
         
        let dummyArticle = generateArticle();

        Cart.addArticle(dummyArticle);
        Cart.addArticle(dummyArticle);

        const arrArticle = JSON.parse(localStorage.getItem("cart-storage"));
        const article = arrArticle.find(article => article.id === dummyArticle.id);

        expect(article.quantity).toEqual("10");
    });

    it("Return an error when the sum is not in the right format", () => {
        let thrownError;
        localStorage.setItem("cart-storage", "[]");

        try{
            let dummyArticle = generateArticle();

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

    it("should return added article", () => {
        localStorage.setItem("cart-storage", "[]");
        let article = generateArticle();

        const result = Cart.addArticle(article);

        expect(result).toEqual(article);
    });
});

describe("Calculate total quantity", () => {
    it("should throw error if only one of the items is invalid", () => {
        let errorThrown;
        let arrItem = generateArrItem();
        arrItem[0].quantity = "-5";

        try{
            localStorage.setItem("cart-storage", JSON.stringify(arrItem));
            let total = Cart.calculateQuantities();
        }catch(e){
            errorThrown = e;
        }

        expect(errorThrown).toEqual({error:"FORMAT_ERROR"});
    });

    it("should return total quantity when everything is ok", () => {
        let arrItem = generateArrItem();
        localStorage.setItem("cart-storage", JSON.stringify(arrItem));
        const totalPrice = Cart.calculateQuantities();
        expect(totalPrice).toBe(181);
    });

    it("should return 0 for empty cart", () => {
        localStorage.setItem("cart-storage", "[]");
        expect(Cart.calculateQuantities()).toEqual(0);
    });
});

describe("Calculate total price", () => {
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

    it("should return total price", () => {
        let itemOne = {
            name:"foo",
            description:"my description",
            id:"5be1ed3f1c9d44000030b061", 
            quantity:"20",
            price:"1200",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        }

        let itemTwo = {
            name:"foo",
            description:"my description",
            id:"5be1ed3f1c9d44000030b062", 
            quantity:"30",
            price:"12500",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        }

        let itemThree = {
            name:"foo",
            description:"my description",
            id:"5be1ed3f1c9d44000030b063", 
            quantity:"40",
            price:"120500",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        }

        localStorage.setItem("cart-storage", "[]");
        Cart.addArticle(itemOne);
        Cart.addArticle(itemTwo);
        Cart.addArticle(itemThree);
        Cart.addArticle(itemThree);

        const total = Cart.calculateTotalPrices();
        expect(total).toEqual(20*12 + 30*125 + 80*1205);
        

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
                id:"5be1ed3f1c9d44000030b061", 
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
        let article = generateArticle();

        Cart.addArticle(article);
        const result = Cart.removeArticle(article.id);

        expect(result).toEqual(article);
    });
});

describe("Submit cart to server", () => {
    it("should send an error when firstName isn't valid", () => {
        expect.assertions(1);
        let submitForm = generateDummyForm();
        submitForm.firstName = "!Arnaud*5"
        return Cart.submit(submitForm).catch(error => expect(error).toEqual({error:"FORMAT_ERROR"}));
    });

    it("should send an error when lastName isn't valid", () => {
        expect.assertions(1);
        let submitForm = generateDummyForm();
        submitForm.lastName = "!Arno"
        return Cart.submit(submitForm).catch(error => expect(error).toEqual({error:"FORMAT_ERROR"}));
    });

    it("should send an error when city isn't valid", () => {
        expect.assertions(1);
        let submitForm = generateDummyForm();
        submitForm.city = "!Paris"
        return Cart.submit(submitForm).catch(error => expect(error).toEqual({error:"FORMAT_ERROR"}));
    });

    it("should send an error when address isn't valid", () => {
        expect.assertions(1);
        let submitForm = generateDummyForm();
        submitForm.address = "rue des tomates"
        return Cart.submit(submitForm).catch(error => expect(error).toEqual({error:"FORMAT_ERROR"}));
    });

    it("should send an error when email isn't valid", () => {
        expect.assertions(1);
        let submitForm = generateDummyForm();
        submitForm.email = "fakemeil@ttt"
        return Cart.submit(submitForm).catch(error => expect(error).toEqual({error:"FORMAT_ERROR"}));
    });

    it("should send an error when one product isn't valid", () => {
        expect.assertions(1);
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
            id:"5be1ed3f1c9d44000030b06", 
            quantity:"13",
            price:"65600",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        };

        let submitForm = generateDummyForm();

        localStorage.setItem("cart-storage", "[]");
        localStorage.setItem("cart-storage", JSON.stringify([
            firstArticle,
            secondArticle,
            thirdArticle
        ]))

        
        return Cart.submit(submitForm).catch(error => expect(error).toEqual({error:"FORMAT_ERROR"}));
    });
});