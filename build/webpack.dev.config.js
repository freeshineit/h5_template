const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DevConfig = require('./config').dev;
const fileName = require('./config').fileName;

const htmlWebpack = () => {
    let plugins = [];
    let filePath = null;
    for (let file of fileName){
        plugins.push(
            new HtmlWebpackPlugin({
                filename: path.resolve(__dirname, `../views/${file.name}/index.html`),
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

const devWebpackConfig = () => {
    let  plugins = [
            new ExtractTextPlugin({
                filename: 'views/[name]/index.css'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new CopyWebpackPlugin([
                { 
                    from: 'resource/static', 
                    to: 'static'
                }
            ])
    ]

    plugins = plugins.concat(htmlWebpack())

    return {
        entry: entryObj,
        output: {
            path: path.resolve(__dirname, '../'),
            filename: 'views/[name]/index.js',
            publicPath: '/'
        },
        devtool: 'eval',    
        devServer: {
            hot: true,
            host: '0.0.0.0',  // 同一局域网段下，可以通过IP (0.0.0.0:8889) 访问
            inline: true, //设置为true，当源文件改变时会自动刷新页面
            port: DevConfig.port, //设置默认监听端口，如果省略
            proxy: DevConfig.proxy,
            noInfo: false,
            open: true,
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
                    test: /\.(png|jpe?g|gif|svg)$/,
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
        plugins: plugins
    }
}

module.exports = devWebpackConfig;