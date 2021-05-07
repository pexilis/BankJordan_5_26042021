const path = require("path");
var common = require("./webpack.common");
const {merge} = require("webpack-merge");


module.exports = merge(common, {
    mode:"development",
    
    output:{
        filename:"[name].js",
        path: path.resolve(__dirname, "dist"),
    },

    module:{
        rules:[
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader", //3. Inject styles into DOM
                    "css-loader", //2. Turns css into CommonJS
                    "sass-loader" //1. Turns sass into css
                ]
            }
        ]
    }
});