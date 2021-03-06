const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const cssnano = require('cssnano');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

module.exports = {
	module: {
		rules: [
			{
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				},

				test: /\.js$/
			},
			{
				test: /\.css$/,

				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',

						options: {
							plugins: function () {
								return [precss, autoprefixer, cssnano];
							}
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: {
					loader: 'mustache2js-loader',
					options: {}
				}
			}
		]
	},

	devtool: 'source-map',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'open-with-newsfeeder-btn.min.js',
		library: 'open-with-newsfeeder-btn',
		libraryTarget: 'umd'
	},
};
