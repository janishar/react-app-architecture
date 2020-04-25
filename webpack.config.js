const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const dotenv = require('dotenv');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// bake .env into the client code
const configEnv = dotenv.config({ debug: true }).parsed;
const envKeys = Object.keys(configEnv).reduce((result, key) => {
  result[`process.env.${key}`] = JSON.stringify(configEnv[key]);
  return result;
}, {});

const isEnvDevelopment = process.env.NODE_ENV === 'development';

const srcPath = path.resolve(__dirname, './src');
const distPath = path.resolve(__dirname, './dist');
const templatePath = path.resolve(__dirname, './public/template.html');
const htmlPath = path.resolve(__dirname, './dist/template.html');

const extractStyle = new MiniCssExtractPlugin({
  filename: isEnvDevelopment ? 'style/[name].css' : 'style/[name].[hash].css',
  chunkFilename: isEnvDevelopment ? 'style/[name].css' : 'style/[name].[hash].css',
});

// used for those files which can't be loaded by url-loader
const copyAssets = new CopyWebpackPlugin([
  // Copy directory contents to {output}/to/directory/
  {
    // from: 'assets', to: 'assets', // if the context directory has assets
    from: './assets',
    to: 'assets',
  },
]);

const cssLoaders = [
  { loader: 'css-loader' },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () =>
        isEnvDevelopment
          ? [autoprefixer]
          : [autoprefixer, cssnano({ discardComments: { removeAll: true, filterPlugins: false } })],
    },
  },
];

module.exports = {
  devtool: isEnvDevelopment ? 'inline-source-map' : false,
  mode: isEnvDevelopment ? 'development' : 'production',
  context: srcPath,
  entry: {
    app: isEnvDevelopment ? ['index.tsx', 'webpack-hot-middleware/client'] : 'index.tsx',
  },
  output: {
    path: distPath,
    filename: isEnvDevelopment ? 'js/[name].js' : 'js/[name].[hash].js',
    publicPath: '/',
  },
  plugins: [
    copyAssets,
    extractStyle,
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(envKeys),
  ].concat(
    isEnvDevelopment
      ? [new webpack.HotModuleReplacementPlugin()]
      : [
          new HtmlWebpackPlugin({
            template: templatePath,
            minify: false,
            filename: htmlPath,
          }),
        ],
  ),
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'babel-loader' },
          {
            loader: path.resolve('./tools/importer-loader.js'),
            options: {
              functionName: 'importer',
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, ...cssLoaders],
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/',
              outputPath: 'assets/',
              limit: 10 * 1000, //10 kb
              fallback: 'file-loader',
            },
          },
        ],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/',
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [srcPath, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: { 'react-dom': '@hot-loader/react-dom' },
  },
  optimization: {
    minimize: !isEnvDevelopment,
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
        vendor: isEnvDevelopment
          ? {
              test: /node_modules/,
              name: 'vendor',
              chunks: 'all',
              enforce: true,
            }
          : {
              test: /node_modules/,
              name: 'vendor',
              chunks: 'all',
              enforce: true,
              minSize: 75 * 1000, // 75 kb
              maxSize: 200 * 1000, // 200 kb
            },
      },
    },
  },
};
