import { hot } from 'react-hot-loader/root';
import React, { Fragment, ReactElement, useEffect } from 'react';
import Routes from './routes';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { testAsyncDispatch } from './actions';
import CssBaseline from '@material-ui/core/CssBaseline';
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
            <Header />
            <div className={classes.root}>{children !== undefined ? children : <Routes />}</div>
        </Fragment>
    );
}

export default hot(App);
