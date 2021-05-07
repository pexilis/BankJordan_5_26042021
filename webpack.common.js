const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPagesNames = ["index", "biling", "cart", "product"];

const generateEntries = pages => {
    if (pages === undefined) return {};

    let entry = {};
    pages.map(page => entry[page] = `./frontend/js/view/${page}.js`);
    return entry;
}

const generateTemplates = pages => {
    if (pages === undefined) return [];
    

    let plugins = [];

    pages.map(page => {
        const htmlPlugin = new HtmlWebpackPlugin({
            filename:`${page}.html`,
            template:`frontend/${page}.html`,
            chunks:[page]
        });

        plugins.push(htmlPlugin);
    })

    return plugins;
}

module.exports = {
    entry:generateEntries(htmlPagesNames),
    plugins:generateTemplates(htmlPagesNames),

    module:{
        rules:[
            {
                test:/\.html$/i,
                use: ["html-loader"]
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type:'asset/resource',
                generator:{
                    filename:'assets/img/[name].[contenthash][ext]'
                }
            },
        ]
    }
}