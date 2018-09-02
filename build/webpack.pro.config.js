const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const Config = require('./config');


const htmlWebpack = (file) => {
    let filePath = path.resolve(__dirname, `../resource/views/${file}/index.html`)
    return new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, `../dist/views/${file}/index.html`),
            inject: 'body',
            template: 'html-withimg-loader!'+ filePath ,
            chunks: [file],
            inlineSource: '.(js|css)$'
    })
}

const entry = {
    home: path.resolve(__dirname, '../resource/views/home/index.js'),
    about: path.resolve(__dirname, '../resource/views/about/index.js'),
}

module.exports = {
    entry: entry,
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
    plugins: [
        new ExtractTextPlugin({
            filename: 'views/[name]/index.[hash:10].css'
        }),
        htmlWebpack ('home'),
        htmlWebpack ('about'),
        new CopyWebpackPlugin([
            { 
                from: 'resource/static', 
                to: 'static'
            }
        ])

        //设置每一次build之前先删除dist
        // new CleanWebpackPlugin(
        //     ['dist/*', 'dist/*',],　     //匹配删除的文件
        //     {
        //         root: __dirname,       　　　　　　　　　　//根目录
        //         verbose: true,        　　　　　　　　　　//开启在控制台输出信息
        //         dry: false        　　　　　　　　　　//启用删除文件
        //     }
        // )
    ],
}