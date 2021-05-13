/**
 * @author Bank Jordan <jordan.developper@outlook.com>
 * @description Class to manage relative to Command access data with user input validation
 */

import "../typedef/typedefs.js";

class Command{
    /**
     * Create a Command.
     * @param {localStorageAPI} model - LocalStorageAPI dependency
     * @param {CartError} error - CartError dependancy
     */

    constructor(model, error) {
        this.CommandModel = model;
        this.CommandError = error;
    }

    /**
     * Get injected dependencies.
     * @return {Dependencies}
     */

    getEveryDependencies() {
        const {CommandModel, CommandError} = this;
        return {
            CommandModel,
            CommandError
        };
    }

    /**
     * Add comamnd
     * Add new command into LocalStorage
     * @param {backendCommand} newCommand - Command from backend to add,
     */

    add(newCommand) {
        const {CommandModel, CommandError} = this;
        newCommand._id = newCommand.orderId;
        CommandModel.addItem(newCommand);
    }

    /**
     * Get command
     * Return command specified by id
     * @param {id} String - Command id
     * @return {Command}
     */

    get(id) {
        const {CommandModel, CommandError} = this;
        CommandError.errorUUID(id);
        return CommandModel.getById(id);
    }
}

export default Command;