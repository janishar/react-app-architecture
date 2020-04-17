// @flow
import type { Request } from 'express';
import type { Node } from 'react';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { CookiesProvider } from 'react-cookie';
import { StaticRouter } from 'react-router-dom';
import { minify as minifyHtml } from 'html-minifier';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import renderTemplate from './template';
import configureStore from './devStoreConfig';
import theme from '../client/theme';
import rootReducer from '../client/reducers'
import App from '../client/ui/app';

const isDev = process.env.NODE_ENV === 'development'

export default (req: Request, view: Node, currentState?: Object,
	title?: string, coverImg?: string, description?: string, preloadedState?: Object) => {
	// create mui server style
	const sheets = new ServerStyleSheets();

	if (!currentState) currentState = {};

	const store = isDev ? configureStore(currentState) : createStore(rootReducer, currentState);

	// Render the component to a string
	const html = renderToString(
		sheets.collect(
			<Provider store={store}>
				<CookiesProvider cookies={req.universalCookies}>
					<StaticRouter location={req.url} context={{}}>
						<ThemeProvider theme={theme}>
							<App>
								{view}
							</App>
						</ThemeProvider>
					</StaticRouter>
				</CookiesProvider>
			</Provider>
		)
	)

	// Grab the CSS from our sheets.
	const css = sheets.toString();

	// for sending the tree structure data
	// to recreated on client side
	// Grab the initial state from our Redux store
	if (preloadedState === undefined) preloadedState = store.getState()

	const baseUrl = `${getProtocol(req)}://${req.get('host')}`;
	const siteUrl = baseUrl + req.originalUrl;

	if (!title) title = `AfterAcademy | React Project`
	if (!coverImg) coverImg = `${baseUrl}/assets/og-cover-image.jpg`
	if (!description) description = 'This is the sample project to learn and implement React app.'

	let htmlPage = render(html, css, preloadedState, siteUrl, title, coverImg, description)

	try {
		htmlPage = minifyHtml(htmlPage, {
			minifyCSS: true,
			minifyJS: true
		})
	} catch (e) { console.log(e) }

	return htmlPage;
}

export const getProtocol = (req: Request): string => {
	let proto = req.connection.encrypted ? 'https' : 'http';
	// only do this if you trust the proxy
	proto = req.headers['x-forwarded-proto'] || proto;
	return proto.split(/\s*,\s*/)[0];
}

export const buildUrl = (req: Request, endpoint: string): string => {
	const baseUrl = `${getProtocol(req)}://${req.get('host')}/`;
	return `${baseUrl}${endpoint}`
}