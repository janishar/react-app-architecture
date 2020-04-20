import React, { ReactElement, useEffect } from 'react';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { sendExampleAction } from './actions';
import { useStateSelector } from '@core/reducers';

interface Props {
	exampleProp: any;
}

export default function Component({ exampleProp }: Props): ReactElement {
	const classes = useStyles();
	const appState = useStateSelector((state) => state.appState);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(sendExampleAction('Example Message'));
	}, [dispatch]);

	return <div className={classes.root}></div>;
}
