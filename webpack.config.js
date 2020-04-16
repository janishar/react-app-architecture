const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const VERSION = require('./package.json').version;
const dotenv = require('dotenv');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// bake .env into the client code
const configEnv = dotenv.config({ debug: true }).parsed;
const envKeys = Object
	.keys(path.join(__dirname, '../.env'))
	.reduce((result, key) => {
		result[`process.env.${key}`] = configEnv[key];
		return result;
	}, {});

const development = process.env.NODE_ENV === 'development'

const extractStyle = new MiniCssExtractPlugin({
	filename: `styles/[name]-${VERSION}.css`,
	chunkFilename: `styles/[name]-${VERSION}.css`
});

// used for those files which can't be loaded by url-loader
const copyAssets = new CopyWebpackPlugin([
	// Copy directory contents to {output}/to/directory/
	{
		// from: 'assets', to: 'assets', // if the context directory has assets 
		from: './src/assets', to: 'assets'
	}
])

const cssLoaders = [
	{
		loader: "css-loader",
	},
	{
		loader: "postcss-loader",
		options: {
			plugins: () => development ? [autoprefixer] :
				[
					autoprefixer,
					cssnano({ discardComments: { removeAll: true, filterPlugins: false } })
				]
		}
	}
];

module.exports = {
	devtool: development ? 'inline-source-map' : false,
	mode: development ? 'development' : 'production',
	context: path.resolve(__dirname, './src'),
	entry: {
		app: development ? ['./src/index.js', 'webpack-hot-middleware/client'] : './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: `js/[name]-bundle-${VERSION}.js`,
		publicPath: '/'
	},
	plugins: [
		copyAssets,
		extractStyle,
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin(envKeys),
	].concat(development ? [
		new webpack.HotModuleReplacementPlugin()
	] : []),
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					...cssLoaders
				]
			},
			{
				test: /\.(scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					...cssLoaders,
					{
						loader: "sass-loader",
						options: {}
					}
				]
			},
			{
				test: /\.(less)$/,
				use: [
					MiniCssExtractPlugin.loader,
					...cssLoaders,
					{
						loader: "less-loader",
						options: {}
					}
				]
			},
			{
				test: /\.(eot|woff|woff2|ttf)$/,
				use: [{
					loader: 'url-loader',
					options: {
						name: "[name].[ext]",
						publicPath: '/',
						outputPath: 'assets/',
						limit: 10 * 1000, //10 kb
						fallback: 'file-loader'
					}
				}]
			},
			{
				test: /\.(svg|png|jpg|jpeg|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: "[name].[ext]",
						publicPath: '/',
						outputPath: 'assets/',
					}
				}]
			}
		]
	},
	resolve: {
		modules: [path.resolve(__dirname, './src'), path.resolve(__dirname, './src'), 'node_modules']
	},
	optimization: {
		minimize: !development,
		splitChunks: {
			cacheGroups: {
				commons: {
					name: "commons",
					chunks: "all",
					minChunks: 2
				},
				vendor: {
					test: /node_modules/,
					name: "vendor",
					chunks: "all",
					enforce: true
				}
			}
		}
	}
};