class CommandError {
    constructor(validator) {
        this.Validator = validator;
    }

    errorUUID(id) {
        const {Validator} = this;
        const result = Validator.checkRegex({
            "orderId":id
        });

        if (!result.valid)
            throw {error:"ERROR_FORMAT"};
    }
}

export default CommandError;