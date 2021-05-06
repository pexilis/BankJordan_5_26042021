const Command = (() => {
    let self = {};
    let CommandModel = null;
    let Validator = null;


    self.init = (model,validator) => {
        CommandModel = model;
        Validator = validator
    }

    self.add = newCommand => {
        if (newCommand === undefined)
            throw {error:"UNDEFINED_ERROR"};

        newCommand._id = newCommand.orderId;
        CommandModel.addItem(newCommand);
    }

    const errorUUID = id => {
        const result = Validator.checkRegex({
            "orderId":id
        });

        if (!result.valid)
            throw {error:"ERROR_FORMAT"};
    }

    self.get = id => {
        errorUUID(id);
        return CommandModel.getById(id);
    }

    return self;
})();

export default Command;