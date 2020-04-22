import { hot } from 'react-hot-loader/root';
import React, { Fragment, ReactElement, useEffect } from 'react';
import Routes from './routes';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import Header from '@ui/header';
import Footer from '@ui/footer';
import { useCookies } from 'react-cookie';
import { useStateSelector } from '@core/reducers';
import { updateAuthDataAction } from '@ui/auth/actions';
import { useRouteMatch } from 'react-router-dom';
import { scrollPageToTop, setPageTitle, removeAppLoader } from '@utils/pageUtils';

export const KEY_AUTH_DATA = 'KEY_AUTH_DATA';

interface Props {
    children: ReactElement;
}

function App({ children }: Props): ReactElement {
    const classes = useStyles();
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const [cookies, setCookie, removeCookie] = useCookies([KEY_AUTH_DATA]);
    const { currentPageTitle } = useStateSelector(({ appState }) => appState);
    const { data: authData, isLoggedIn, isForcedLogout } = useStateSelector(
        ({ authState }) => authState,
    );

    useEffect(() => {
        removeAppLoader();
    }, []);

    useEffect(() => {
        if (currentPageTitle) setPageTitle(currentPageTitle);
    }, [currentPageTitle]);

    useEffect(() => {
        const authData = cookies[KEY_AUTH_DATA];
        if (authData) dispatch(updateAuthDataAction(authData));
    }, [cookies, dispatch]);

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

    useEffect(() => {
        if (!isForcedLogout && isLoggedIn) setAuthCookies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isForcedLogout, isLoggedIn]);

    const setAuthCookies = () => {
        if (authData) {
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
                <div className={classes.contentArea}>
                    {children !== undefined ? children : <Routes />}
                </div>
                <Footer />
            </div>
        </Fragment>
    );
}

export default hot(App);
