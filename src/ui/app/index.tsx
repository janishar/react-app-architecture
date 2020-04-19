import { hot } from 'react-hot-loader/root';
import React, { ReactElement, useEffect } from 'react';
import Routes from './routes';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { testAsyncDispatch } from './actions';
import CssBaseline from '@material-ui/core/CssBaseline';

interface Prop {
	children: ReactElement;
}

function App({ children }: Prop): ReactElement {
	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(testAsyncDispatch('Test Title'));
	}, [dispatch]);

	return (
		<React.Fragment>
			<CssBaseline />
			<div className={classes.root}>{children !== undefined ? children : <Routes />}</div>;
		</React.Fragment>
	);
}

export default hot(App);
