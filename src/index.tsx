import React, { useEffect, ReactElement } from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '@material-ui/core/styles';

import rootReducer from '@core/reducers';
import App from '@ui/app';
import { logger, crashReporter } from '@utils/reduxMiddlewares';
import theme from '@core/theme';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, logger, crashReporter),
);

const Routes = (): ReactElement => {
  // remove the css sent inline in the html on client side
  // useEffect in similar to componentDidMount for function components
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles);
  }, []);

  return (
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Route component={App} />
          </ThemeProvider>
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  );
};

hydrate(<Routes />, document.getElementById('root'));
