import React, { ReactElement } from 'react';
// import useStyles from './style';

import image from './img/test-image.png';

console.log('image', image);

export default function Landing(): ReactElement {
	// const classes = useStyles();
	return (
		<div>
			<h1>TESTING</h1>
			<img src={image}></img>
		</div>
	);
}
