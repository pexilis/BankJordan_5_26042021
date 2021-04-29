import Cart from "./cart.js";

const generateDummyForm = _ => {
    return {
        firstName:"Jean",
        lastName:"Petit",
        address:"45 rue des tomates",
      city:"Toronto",
        email:"totototo@gmail.com"
    }
}

let firstArticle = {
    name:"foo",
    description:"my description",
    id:"5be1ef211c9d44000030b062", 
    quantity:"10",
    price:"455500",
    imageUrl:"http://localhost:3000/images/vcam_1.jpg"
};

let secondArticle = {
    name:"bar",
    description:"my description",
    id:"5be9c4471c9d440000a730e8", 
    quantity:"15",
    price:"35200",
    imageUrl:"http://localhost:3000/images/vcam_1.jpg"
};

let thirdArticle = {
    name:"ber",
    description:"my description",
    id:"5be9c4c71c9d440000a730e9", 
    quantity:"13",
    price:"65600",
    imageUrl:"http://localhost:3000/images/vcam_1.jpg"
};

localStorage.setItem("cart-storage", "[]");
Cart.addArticle(firstArticle);
Cart.addArticle(firstArticle);
Cart.addArticle(secondArticle);
Cart.addArticle(secondArticle);
Cart.addArticle(thirdArticle);
Cart.addArticle(thirdArticle);

let submitForm = generateDummyForm();

window.onstorage = () => {
    console.log("Hello");
}

document.addEventListener("DOMContentLoaded", () => {
    const countArticles = Cart.calculateQuantities();

    const numbers = document?.querySelector("#number");
    numbers.textContent = countArticles;

    document?.querySelector("#fetch")?.addEventListener("click", e => {
        Cart.submit(submitForm)
            .then(result => {
                let countArticles = Cart.calculateQuantities();
                const numbers = document?.querySelector("#number");
                numbers.textContent = countArticles;
            })
            .catch(error => console.log(error))
    });

    
});