const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const Config = require('./config');


const htmlWebpack = (file) => {
	let filePath = path.resolve(__dirname, `../resource/views/${file}/index.html`)
	return new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, `../views/${file}/index.html`),
            inject: 'body',
            template: 'html-withimg-loader!'+ filePath,
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
		filename: 'views/[name]/index.js'
	},
    devtool: 'eval',    
    devServer: {
        // contentBase: path.resolve(__dirname, '../views'), //默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
        hot: true,
        host: '0.0.0.0',  // 同一局域网段下，可以通过IP (0.0.0.0:8889) 访问
        inline: true, //设置为true，当源文件改变时会自动刷新页面
        port: Config.dev.port, //设置默认监听端口，如果省略
        proxy: Config.dev.proxy,
        noInfo: false,
        open: true
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
                test: /\.(sass|scss|css)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                            'css-loader', 
                            `sass-loader`
                    ]
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
            filename: 'views/[name]/index.css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        htmlWebpack ('home'),
        htmlWebpack ('about'),
        new CopyWebpackPlugin([
    		{ 
    			from: 'resource/static', 
    			to: 'static'
    		}
  		])
    ],
}