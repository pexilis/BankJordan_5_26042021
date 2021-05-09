class CommandCalculate {
    constructor(command) {
        this.Command = command;
    }

    totalPrice(id) {
        const {Command} = this;
        const currCommand = Command.get(id);

        const prices = currCommand.products.map(product => {
            const price = product.price;
            let formatedPrice = price.slice(0, price.length - 2);
            return formatedPrice = Number.parseInt(formatedPrice);
        });
        
        return prices.reduce((old, next) => old + next);
    }
}

export default CommandCalculate;