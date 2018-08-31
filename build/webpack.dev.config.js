const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const Config = require('./config');


const htmlWebpack = (file) => {
	let filePath = path.resolve(__dirname, `../public/views/${file}/index.html`)
	return new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, `../dist/views/${file}/index.html`),
            inject: 'body',
            template: 'html-withimg-loader!'+ filePath ,
            chunks: [file],
            inlineSource: '.(js|css)$'
    })
}

const entry = {
	home: path.resolve(__dirname, '../public/views/home/index.js'),
	about: path.resolve(__dirname, '../public/views/about/index.js'),
}

module.exports = {
	entry: entry,
	output: {
		filename: 'views/[name]/index.js',
		publicPath: '/'
	},
    devtool: 'eval',    
    devServer: {
        contentBase: [path.resolve(__dirname, '../'),path.resolve(__dirname, '../views')], //默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
        historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        hot: true,
        host: '0.0.0.0',  // 同一局域网段下，可以通过IP (192.168.X.X:8000) 访问
        inline: true, //设置为true，当源文件改变时会自动刷新页面
        port: Config.dev.port, //设置默认监听端口，如果省略，默认为"8083"
        proxy: Config.dev.proxy
    },
    module: {
        rules: [
            //解析.js
            {   
                test: '/\.js$/',  
                loader: 'babel',  
                exclude: path.resolve(__dirname, 'node_modules'), 
                include: path.resolve(__dirname, '../public'),
                query: {
                    presets: ['env'] 
                }
            },
            {
                test: /\.less|css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', `less-loader?{"sourceMap":true}`]
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
        // new ExtractTextPlugin(path.resolve(__dirname, '../public/assert/less/common.less')),
        new ExtractTextPlugin({
            filename: 'views/[name]/index.css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        htmlWebpack ('home'),
        htmlWebpack ('about'),
        new CopyWebpackPlugin([
    		{ 
    			from: 'public/static', 
    			to: 'static'
    		}
  		])
    ],
}