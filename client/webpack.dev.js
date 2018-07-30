// process.env.API_URL = 'localhost:8000';
var webpack = require('webpack')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  	plugins: [
		new webpack.DefinePlugin({
			process:{
				env:{
					NODE_ENV: JSON.stringify('development'),
					API_URL: JSON.stringify(''),
					WWW_URL: JSON.stringify('https://localhost:8080'),
				}
			}
		}),
  	],
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		inline:true,
		compress: true,
		// overlay: true,
		https: true,
		hot: false,
		allowedHosts: [
			'localhost',
			'127.0.0.1',
		],
		host: '0.0.0.0',
		port: 8080,
		historyApiFallback: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': '*'//X-Requested-With, content-type, Authorization'
		},
	}
})
