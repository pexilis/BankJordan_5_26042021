import Cart from "../cart";

describe("See all articles", () => {
    it("should throw an error when LocalStorage isn't initialized", () => {
        expect.assertions(1);
        return Cart.listArticles().catch(e => expect(e).toEqual({error:"INITIALIZATION_ERROR"}));
    });

    it("should return every articles when all is ok", () => {
        expect.assertions(1);
        localStorage.setItem("cart-storage", "[]");
        return Cart.listArticles().then(data => expect(data).toEqual([]));
    });
});

describe("Empty the cart", () => {
    it("should throw an error when the cart is empty", () => {
        expect.assertions(1);
        localStorage.setItem("cart-storage", "[]");
        return Cart.clearCart().catch(e => expect(e).toEqual({error:"EMPTY_ERROR"}));
    });

    it("should throw an error when the cart isn't initialized", () => {
        localStorage.removeItem("cart-storage");
        expect.assertions(1);
        return Cart.clearCart().catch(e => expect(e).toEqual({error:"INITIALIZATION_ERROR"}));
    });
})