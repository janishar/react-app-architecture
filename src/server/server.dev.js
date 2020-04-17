// @flow
/*
 Babel ES6/JSX Compiler
 All subsequent files required by Node with the extensions 
 .es6, .es, .jsx and .js will be transformed by Babel.
 it is no longer necessary to run the app using babel-node command.
 <RoutingContext {...renderProps} /> (ES6/JSX) has been
 replaced with React.createElement(Router.RoutingContext, renderProps) (ES5).
 That’s because Babel Require Hook transforms only subsequent files, not current file.
*/
require('@babel/register');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../../webpack.config');
const app = require('./app').default;

var serverOptions = {
	quiet: false,
	noInfo: false,
	hot: true,
	inline: true,
	lazy: false,
	publicPath: webpackConfig.output.publicPath,
	stats: { colors: true }
};

const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, serverOptions))
app.use(webpackHotMiddleware(compiler))

app.listen(process.env.PORT || 3001,
	() => { console.log(`🚧 server listening on port : ${process.env.PORT || 3001}`); })
	.on('error', e => console.log(e));