const CommandCalculate = (() => {
    const self = {};

    let Command = null; 

    self.init = command => {
        Command = command;
    }

    self.totalPrice = id => {
        const currCommand = Command.get(id);
        const prices = currCommand.products.map(product => {
            const price = product.price;
            let formatedPrice = price.slice(0, price.length - 2);
            return formatedPrice = Number.parseInt(formatedPrice);
        });

        return prices.reduce((old, next) => old + next);
    }

    return self;
})();

export default CommandCalculate;