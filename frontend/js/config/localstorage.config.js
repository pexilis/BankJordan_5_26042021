(() => {
    if (localStorage.getItem("cart-storage") === null)
        localStorage.setItem("cart-storage", "[]");
    if (localStorage.getItem("command-storage") === null)
        localStorage.setItem("command-storage", "[]");
})();