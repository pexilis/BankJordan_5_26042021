const GenerateCommand = (() => {
    let self = {};
    let Command = null;
    let CommandCalculate = null;
   
    self.init = (command, calcul) => {
        Command = command;
        CommandCalculate = calcul;
    }

    self.run = async(id) => {
        const currentCommand = Command.get(id);
        const contact = currentCommand.contact;

        const {firstName, 
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

    return self;
})();

export default GenerateCommand;