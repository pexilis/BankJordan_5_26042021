import Global from "./global.config.js";
import Validator from "../utils/Validator.js";

const FormRegex = () => {
    Validator.addRegex("name", "^[a-zA-Z]{3,25}$");
    Validator.addRegex("city", "^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$");
    Validator.addRegex("address", "^[0-9]{1,2}[a-zA-Z ]{2,45}$");
    Validator.addRegex("email", /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
}

const ProductRegex = () => {
    Validator.addRegex("orderId", "^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$")
    Validator.addRegex("uuid", "^[0-9a-z]{24}$");
    Validator.addRegex("quantity", "^[0-9]{1,2}$");
    Validator.addRegex("price", "^[0-9]{1,}00$");
    Validator.addRegex("url", `^${Global.protocol}:\/\/${Global.hostname}:${Global.port}\/images\/${Global.imgName}_[0-9]{1,}\.jpg$`);
}


(() => {
   FormRegex();
   ProductRegex(); 
})();

export default Validator;