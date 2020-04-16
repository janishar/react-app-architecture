// @flow
import { hot } from 'react-hot-loader/root'; // required at the top for a bug in react-hot-loader lib
import React, { useEffect } from 'react';
import { hydrate } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '@material-ui/styles';

function square(n: number): number {
	return n * n;
}

square("2"); // Error!

import RootReducer from './reducers'
import AppContainer from './ui/app/Container';

import { logger, crashReporter } from './helpers/redux-middlewares'
import CacheProvider from './providers/CacheProvider';

import theme from './theme'

// Grab the state from a global variable injected into the server-generated HTML
let preloadedState = window.__PRELOADED_STATE__

try {
	if (preloadedState && preloadedState.authData && preloadedState.authData.credential) 
		preloadedState.authData.credential = JSON.parse(atob(preloadedState.authData.credential));
} catch (e) { console.log(e) }

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// Create Redux store with initial state
const store = createStore(
	RootReducer,
	preloadedState,
	applyMiddleware(
		thunkMiddleware,
		logger,
		crashReporter
	))

const Routes = () => {
	// remove the css sent inline in the html on client side
	// useEffect in similar to componentDidMount for function components
	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) jssStyles.parentNode.removeChild(jssStyles);
	}, []);

	return (
		<Provider store={store}>
			<CookiesProvider>
				<BrowserRouter>
					<CacheProvider>
						<ThemeProvider theme={theme}>
							<Route component={AppContainer} />
						</ThemeProvider>
					</CacheProvider>
				</BrowserRouter>
			</CookiesProvider>
		</Provider>
	)
};

hydrate(<Routes />, document.getElementById('root'))