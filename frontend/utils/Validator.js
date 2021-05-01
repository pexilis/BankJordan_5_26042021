const Validator = (() => {
    let self = {};
    const regexDict = {};

    self.addRegex = (name, regex) => {
        regexDict[name] = new RegExp(regex);
    };

    self.checkRegex = dict => {
        const check = Object.entries(dict).every(data => {
            const key = data[0];
            const value = data[1];
            const regex = regexDict[key];
            let result; 

            if (typeof value === "object"){
                result = value.every(toTest => regex.test(toTest));    
            }else{
                result = regex.test(value);
            }
            
            return result;
        });

        return {valid:check, result:dict};
    }

    return self;
})();

export default Validator;