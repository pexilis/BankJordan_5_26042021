export function generateArticle() {
    return  {
                name:"foo",
                description:"my description",
                _id:"5be1ed3f1c9d44000030b062", 
                quantity:"5",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            };   
}

export function generateArticleWithNegativeQuantity() {
    return  {
                name:"foo",
                description:"my description",
                _id:"5be1ed3f1c9d44000030b061", 
                quantity:"-5",
                price:"4500",
                imageUrl:"http://localhost:3000/images/vcam_1.jpg"
            };   
}

export function generateDummyProducts() {
    return [
        "5be1ed3f1c9d44000030b061",
        "5be1ef211c9d44000030b062"
    ];
}

export function generateArrItem () {
    return [
        {
            name:"foo",
            description:"my description",
            _id:"5be1ed3f1c9d44000030b061", 
            quantity:"85",
            price:"4500",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        },
        {
            name:"foo",
            description:"my description",
            _id:"5be1ed3f1c9d44000030b062", 
            quantity:"54",
            price:"4500",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        },
        {
            name:"foo",
            description:"my description",
            _id:"5be1ed3f1c9d44000030b062", 
            quantity:"22",
            price:"4500",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        },
        {
            name:"foo",
            description:"my description",
            _id:"5be1ed3f1c9d44000030b062", 
            quantity:"20",
            price:"4500",
            imageUrl:"http://localhost:3000/images/vcam_1.jpg"
        }
    ]
}

export function generateDummyForm () {
    return {
        firstName:"Jean",
        lastName:"Petit",
        address:"45 rue des tomates",
        city:"Toronto",
        email:"totototo@gmail.com"
    }
}