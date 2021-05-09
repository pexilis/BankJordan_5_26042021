const path = require("path");
var common = require("./webpack.common");
const {merge} = require("webpack-merge");
const webpack = require("webpack");

module.exports = merge(common, {
    mode:"development",
    
    output:{
        filename:"[name].js",
        path: path.resolve(__dirname, "dist"),
    },

    plugins:[
        new webpack.EnvironmentPlugin({
            HOSTNAME:'127.0.0.1:3000',
            PROTOCOL:'http',
        })  
    ],

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