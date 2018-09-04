const path = require('path');

/**
 * 静态资源文件名
 * name: 静态资源名
 * js: 是否有对应的js文件
 */
const fileName = [
    {name: 'home', 'js': true},
    {name: 'about', 'js': true},
    {name: 'plus', 'js': true},
    {name: 'icon', 'js': true},
    {name: 'find', 'js': true},
];

module.exports = {
	fileName: fileName,
	dev: {
		port: 8889,
		publicPath: path.resolve(__dirname, '../static'),
		proxy: {
			'/':{
                target:'https://m.baidu.com',
                secure:true,
                changeOrigin:true
            }
		},
		entry: path.resolve(__dirname, '../public/js/index.js'),
	},
	pro: {
		buildPath: path.resolve(__dirname, '../dist'),
		entry: path.resolve(__dirname, '../public/js/index.js'),
		piclicStatic: path.resolve(__dirname, '../public/static'),
	}
}