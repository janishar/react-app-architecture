import React, { ReactElement } from 'react';
import { testImage } from './assets';

export default function Landing(): ReactElement {
	// const classes = useStyles();
	return (
		<div>
			<img src={testImage}></img>
			<h1>TESTING</h1>
		</div>
	);
}
