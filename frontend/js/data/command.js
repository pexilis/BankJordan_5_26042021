const Command = (() => {
    let self = {};
    let CommandModel = null;
    let CommandError = null;

    
    self.init = (model, error) => {
        CommandModel = model;
        CommandError = error;
    }

    self.add = newCommand => {
        if (newCommand === undefined)
            throw {error:"UNDEFINED_ERROR"};

        newCommand._id = newCommand.orderId;
        CommandModel.addItem(newCommand);
    }

    self.get = id => {
        CommandError.errorUUID(id);
        return CommandModel.getById(id);
    }

    return self;
})();

export default Command;