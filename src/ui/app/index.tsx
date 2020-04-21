import { hot } from 'react-hot-loader/root';
import React, { Fragment, ReactElement, useEffect } from 'react';
import Routes from './routes';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { testAsyncDispatch } from './actions';
import { CssBaseline } from '@material-ui/core';
import Header from '@ui/header';

interface Props {
    children: ReactElement;
}

function App({ children }: Props): ReactElement {
    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(testAsyncDispatch('Test Title'));
    }, [dispatch]);

    return (
        <Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <Header />
                <div className={classes.contentArea}>
                    {children !== undefined ? children : <Routes />}
                </div>
            </div>
        </Fragment>
    );
}

export default hot(App);
