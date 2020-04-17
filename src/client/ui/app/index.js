// @flow
import { hot } from 'react-hot-loader/root';
import React, { useState, useEffect } from 'react';
import Routes from './routes';
import useStyles from './style'

function App({ children }) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			{children !== undefined ? children : <Routes />}
		</div>
	);
}

export default hot(App);