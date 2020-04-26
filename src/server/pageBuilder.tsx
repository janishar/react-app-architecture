import React from 'react';
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
import rootReducer, { RootState } from '@core/reducers';
import App, { KEY_AUTH_DATA } from '@ui/app';
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

export type PageInfo = {
  title: string;
  description: string;
  coverImg?: string;
};

export default function pageBuilder(
  req: PublicRequest,
  pageinfo: PageInfo = {
    title: 'AfterAcademy | React Project',
    description: 'This is the sample project to learn and implement React app.',
  },
  currentState: Partial<RootState> = {},
): string {
  // create mui server style
  const sheets = new ServerStyleSheets();

  const authData = req.universalCookies.get(KEY_AUTH_DATA);
  if (authData?.tokens?.accessToken) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tokens, ...data } = authData;
    currentState.authState = {
      data: data, // security
      isLoggingIn: false,
      isLoggingOut: false,
      isLoggedIn: true,
      isForcedLogout: false,
      isRedirectHome: false,
      message: null,
    };
  }

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
              <App />
            </ThemeProvider>
          </StaticRouter>
        </CookiesProvider>
      </Provider>,
    ),
  );

  // Grab the CSS from our sheets.
  const css = sheets.toString();

  const baseUrl = `${getProtocol(req)}://${req.get('host')}`;
  const siteUrl = baseUrl + req.originalUrl;

  const { coverImg, title, description } = pageinfo;

  let htmlPage = render({
    html: html,
    css: css,
    preloadedState: store.getState(),
    siteUrl: siteUrl,
    title: title,
    coverImg: coverImg ? coverImg : `${baseUrl}/assets/og-cover-image.jpg`,
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
