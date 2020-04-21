import React, { ReactElement } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { CookiesProvider } from 'react-cookie';
import { StaticRouter } from 'react-router-dom';
import { minify as minifyHtml } from 'html-minifier';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import render from './template';
import configureStore from './devStoreConfig';
import theme from '@core/theme';
import rootReducer from '@core/reducers';
import App from '@ui/app';
import { PublicRequest } from 'server-types';
import thunk from 'redux-thunk';

const isDev = process.env.NODE_ENV === 'development';

export const getProtocol = (req: PublicRequest): string => {
    // @ts-ignore
    let proto: string = req.connection.encrypted ? 'https' : 'http';
    // only do this if you trust the proxy
    const forwarded = req.headers['x-forwarded-proto'];
    if (forwarded) proto = forwarded.toString();
    return proto.split(/\s*,\s*/)[0];
};

export const buildUrl = (req: PublicRequest, endpoint: string): string => {
    const baseUrl = `${getProtocol(req)}://${req.get('host')}/`;
    return `${baseUrl}${endpoint}`;
};

export default function pageBuilder(
    req: PublicRequest,
    view: ReactElement,
    currentState?: any,
    title?: string,
    coverImg?: string,
    description?: string,
    preloadedState?: any,
): string {
    // create mui server style
    const sheets = new ServerStyleSheets();

    if (!currentState) currentState = {};

    const store = isDev
        ? configureStore(currentState)
        : createStore(rootReducer, currentState, applyMiddleware(thunk));

    // Render the component to a string
    const html = renderToString(
        sheets.collect(
            <Provider store={store}>
                <CookiesProvider cookies={req.universalCookies}>
                    <StaticRouter location={req.url} context={{}}>
                        <ThemeProvider theme={theme}>
                            <App>{view}</App>
                        </ThemeProvider>
                    </StaticRouter>
                </CookiesProvider>
            </Provider>,
        ),
    );

    // Grab the CSS from our sheets.
    const css = sheets.toString();

    // for sending the tree structure data
    // to recreated on client side
    // Grab the initial state from our Redux store
    if (preloadedState === undefined) preloadedState = store.getState();

    const baseUrl = `${getProtocol(req)}://${req.get('host')}`;
    const siteUrl = baseUrl + req.originalUrl;

    if (!title) title = `AfterAcademy | React Project`;
    if (!coverImg) coverImg = `${baseUrl}/assets/og-cover-image.jpg`;
    if (!description) description = 'This is the sample project to learn and implement React app.';

    let htmlPage = render({
        html: html,
        css: css,
        preloadedState: preloadedState,
        siteUrl: siteUrl,
        title: title,
        coverImg: coverImg,
        description: description,
    });

    try {
        htmlPage = minifyHtml(htmlPage, {
            minifyCSS: true,
            minifyJS: true,
        });
    } catch (e) {
        console.log(e);
    }

    return htmlPage;
}
