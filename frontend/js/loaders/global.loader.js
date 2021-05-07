import * as loaders from "../loaders/utils.loader.js";
import * as datas from "../loaders/data.loader.js";
import * as errors from "../loaders/error.loader.js";
import * as actions from "../loaders/action.loader.js";
import * as services from "../loaders/services.loader.js";


const injectDependencies = () => {
    Object.entries(loaders).
       forEach(([name, exported]) => window[name] = exported);

    Object.entries(datas).
       forEach(([name, exported]) => window[name] = exported);

    Object.entries(errors).
       forEach(([name, exported]) => window[name] = exported);

    Object.entries(actions).
       forEach(([name, exported]) => window[name] = exported);

    Object.entries(services).
       forEach(([name, exported]) => window[name] = exported);
}

(() => {
   console.log("INJECT");
    injectDependencies();
})();
