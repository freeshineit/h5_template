const path = require('path');


module.exports = {
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