import "../../scss/biling.scss";

import "../loaders/global.loader.js";
import PageConfig from "../config/view/biling.config.js";
import PageGlobal from "../config/view/global.config.js";


const model = new LocalStorageAPI("command-storage");
const commandError = new CommandError(ConfigValidator);
const command = new Command(model, commandError);
const commandCalculate = new CommandCalculate(command);
const generateCommand = new GenerateCommand(command, commandCalculate);
const id = PageConfig.data["id"];

document.addEventListener("DOMContentLoaded", () => {
    generateCommand.run(id).then(data => {
        PageConfig.drawInfo(id, data);
    }).catch(error => {
        console.log(error);
    });
});