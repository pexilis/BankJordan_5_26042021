const CommandError = (() => {
    let self = {};
    let Validator = null;

    
    self.init = validator => {
        Validator = validator;
    }

    self.errorUUID = id => {
        const result = Validator.checkRegex({
            "orderId":id
        });

        if (!result.valid)
            throw {error:"ERROR_FORMAT"};
    }

    return self;
})();

export default CommandError;