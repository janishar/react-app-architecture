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

const app = require('./app').default;

// app.use(require('../source/server-routes/routes-prod'))

app.listen(process.env.PORT || 3001,
	() => { console.log(`🚧 server listening on port : ${process.env.PORT || 3001}`); })
	.on('error', e => console.log(e));