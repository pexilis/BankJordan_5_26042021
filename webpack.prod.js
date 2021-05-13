const path = require("path");
var common = require("./webpack.common");
const {merge} = require("webpack-merge");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const webpack = require("webpack")

const HtmlCritical = (page,width,height) => {
    return new HtmlCriticalWebpackPlugin({
        base: path.resolve(__dirname, 'dist'),
        src:  page,
        dest: page,
        inline: true,
        minify: true,
        extract:true,
        width: width,
        height: height,
    })
}

module.exports = merge(common, {
    mode:"production",
    plugins:[
        new MiniCssExtractPlugin({
            filename: "src/css/[name].[fullhash].min.css",
        }),
        new webpack.EnvironmentPlugin({
            HOSTNAME:'orinoco-back.herokuapp.com',
            PROTOCOL:'https',
            MAX_QUANTITY:10,
        }), 
        HtmlCritical("index.html", 375, 625),
        HtmlCritical("cart.html", 375, 625),
        HtmlCritical("product.html", 375, 625),
        HtmlCritical("biling.html", 375, 625),
        new CleanWebpackPlugin()
    ],
    output:{
        filename:"src/js/[name].[fullhash].min.js",
        path: path.resolve(__dirname, "dist"),
    },
    module:{
        rules:[
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", 
                    "sass-loader"
                ]
            },
            {
                test:/\.m?js$/,
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader:"babel-loader",
                }
            }
        ]
    }
});