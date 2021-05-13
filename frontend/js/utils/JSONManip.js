const JSONManip = (() => {
    let self = {};

    self.stringifyJSON = (json) => {
        const validJS = (json !== null && typeof json === "object");
        if (!validJS)
            return false; 

       
        Object.entries(json).map(([key, value]) => {
            if (typeof value === "number")
                json[key] = value.toString();  
            self.stringifyJSON(value)
        });
    }

    self.genericJSON = async(response) => {
        let json;

        try{
            json = await response.json();
        }catch(e){
            throw {error:"JSON_ERROR"}
        }

        self.stringifyJSON(json);
        return json;
    }
        
    self.formToJSON = (form, keys) => {
        const formData = new FormData(form);
        const jsonDict = {};
        keys.map(key => {
            const value = formData.get(key);
            jsonDict[key] = value;
        });

        return jsonDict;
    }
    
    return self;
})();

export default JSONManip;