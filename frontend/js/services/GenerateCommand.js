class GenerateCommand {
    constructor(command, calcul) {
        this.Command = command;
        this.CommandCalculate = calcul;
    }

    async run(id) {
        const {Command, CommandCalculate} = this;
        const currentCommand = Command.get(id);
        const contact = currentCommand.contact;
        const {
            firstName, 
            lastName, 
            city,
            address,
            email, 
        } = contact;
        
        const totalPrice = CommandCalculate.totalPrice(id);

        return {
            firstName,
            lastName,
            city,
            address,
            email,
            totalPrice
        };
    }
}

export default GenerateCommand;