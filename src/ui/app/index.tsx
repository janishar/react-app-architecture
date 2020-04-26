import { hot } from 'react-hot-loader/root';
import React, { Fragment, ReactElement, useEffect, useRef } from 'react';
import Routes from './routes';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import Header from '@ui/header';
import Footer from '@ui/footer';
import { useCookies } from 'react-cookie';
import { useStateSelector } from '@core/reducers';
import { updateAuthData } from '@ui/auth/actions';
import { useRouteMatch } from 'react-router-dom';
import { scrollPageToTop, setPageTitle, removeAppLoader } from '@utils/pageUtils';

export const KEY_AUTH_DATA = 'KEY_AUTH_DATA';

function App(): ReactElement {
  const willMount = useRef(true);
  const classes = useStyles();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const [cookies, setCookie, removeCookie] = useCookies([KEY_AUTH_DATA]);
  const { currentPageTitle } = useStateSelector(({ appState }) => appState);
  const { data: authData, isLoggedIn } = useStateSelector(({ authState }) => authState);

  // only run on the client
  if (typeof window !== 'undefined' && willMount.current) {
    const authData = cookies[KEY_AUTH_DATA];
    if (authData) dispatch(updateAuthData.action(authData));
    willMount.current = false;
  }

  useEffect(() => {
    removeAppLoader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentPageTitle) setPageTitle(currentPageTitle);
  }, [currentPageTitle]);

  useEffect(() => {
    scrollPageToTop();
  }, [match]);

  useEffect(() => {
    if (isLoggedIn) {
      setAuthCookies();
    } else {
      removeAuthCookies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const setAuthCookies = () => {
    if (authData?.tokens?.accessToken) {
      const expiryInSec = 30 * 24 * 60 * 60; // 30 days
      setCookie(KEY_AUTH_DATA, authData, {
        path: '/',
        maxAge: expiryInSec,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production', // only https access allowed
      });
    }
  };

  const removeAuthCookies = () => {
    removeCookie(KEY_AUTH_DATA, { path: '/' });
  };

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Header />
        <div className={classes.content}>
          <Routes />
        </div>
        <Footer />
      </div>
    </Fragment>
  );
}

export default hot(App);
