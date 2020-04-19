import { hot } from 'react-hot-loader/root';
import React, { ReactElement, useEffect } from 'react';
import Routes from './routes';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { testAsyncDispatch } from './actions';

interface Prop {
	children: ReactElement;
}

function App({ children }: Prop): ReactElement {
	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(testAsyncDispatch('Test Title'));
	}, [dispatch]);

	return <div className={classes.root}>{children !== undefined ? children : <Routes />}</div>;
}

export default hot(App);
