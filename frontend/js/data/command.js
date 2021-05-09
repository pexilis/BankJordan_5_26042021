class Command{
    constructor(model, error) {
        this.CommandModel = model;
        this.CommandError = error;
    }

    getEveryDependencies() {
        const {CommandModel, CommandError} = this;
        return {
            CommandModel,
            CommandError
        };
    }

    add(newCommand) {
        const {CommandModel} = this;
        if (newCommand === undefined)
            throw {error:"UNDEFINED_ERROR"};

        newCommand._id = newCommand.orderId;
        CommandModel.addItem(newCommand);
    }

    get(id) {
        const {CommandModel, CommandError} = this;
        CommandError.errorUUID(id);
        return CommandModel.getById(id);
    }
}
export default Command;