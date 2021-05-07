import "../loaders/global.loader.js";
import PageConfig from "../config/view/biling.config.js";
import PageGlobal from "../config/view/global.config.js";

(() => {
    const model = new LocalStorageAPI("command-storage");
    CommandError.init(ConfigValidator);
    Command.init(model, CommandError);
    CommandCalculate.init(Command);
    GenerateCommand.init(Command, CommandCalculate);
})();

const id = PageConfig.data["id"];

document.addEventListener("DOMContentLoaded", () => {
    GenerateCommand.run(id).then(data => {
        PageConfig.drawInfo(id, data);
    }).catch(error => {

    });
});