const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ProConfig = require('./config').pro;
const fileName = require('./config').fileName;

const htmlWebpack = () => {
    let plugins = [];
    let filePath = null;
    for (let file of fileName){
        plugins.push(
            new HtmlWebpackPlugin({
                filename: path.resolve(__dirname, `../dist/views/${file.name}/index.html`),
                inject: 'body',
                template: 'html-withimg-loader!'+ path.resolve(__dirname, `../resource/views/${file.name}/index.html`),
                chunks: [file.name],
                inlineSource: '.(js|css)$'
            })
        )
    }
    return plugins;
}

const entryObj = () => {
    let entry = {}
    for (let file of fileName){
        if (file.js)
            entry[file.name] = path.resolve(__dirname, `../resource/views/${file.name}/index.js`);
    }
    return entry;
}

module.exports =  () => {

    let plugins = [
            new ExtractTextPlugin({
                filename: 'views/[name]/index.[hash:10].css'
            }),
            new CopyWebpackPlugin([
                { 
                    from: 'resource/static', 
                    to: 'static'
                }
            ])
        ];
    plugins = plugins.concat(htmlWebpack())

    return {
        entry: entryObj,
        output: {
            path: path.resolve(__dirname,'../dist'),
            filename: 'views/[name]/index.[hash:10].js',
            publicPath: '/',
        },
        module: {
            rules: [
                //解析.js
                {   
                    test: '/\.js$/',  
                    loader: 'babel',  
                    exclude: path.resolve(__dirname, 'node_modules'), 
                    include: path.resolve(__dirname, '../resource'),
                    query: {
                        presets: ['env'] 
                    }
                },
                {
                    test: /\.less|css$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', `sass-loader`]
                    }),
                },
                { 
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    query: {
                        name: 'assets/images/[name]-[hash:5].[ext]'
                    },
                },
                {
                    test: /\.(htm|html)$/i,
                    use:[ 'html-withimg-loader'] 
                }
            ]
        },
        plugins: plugins,
    }
}