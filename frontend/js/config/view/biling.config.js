const PageConfig = (() => {
    let self = {};

    self.data = [];

    self.firstName = document.querySelector("#firstname");
    self.lastName = document.querySelector("#lastname");
    self.city = document.querySelector("#city");
    self.address = document.querySelector("#address");
    self.price = document.querySelector("#price");
    self.command = document.querySelector("#command");

    self.drawInfo = (id, data) => {
        document.title = `Orinoco - Commande - ${id}`
        self.command.textContent = `Commande : ${id}`;
        self.firstName.textContent = data.firstName;
        self.lastName.textContent = data.lastName;
        self.city.textContent = data.city;
        self.address.textContent = data.address;
        self.price.textContent = `${data.totalPrice}€`;
    }

    return self;
})();

(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    PageConfig.data["id"] = id;
})();

export default PageConfig;