import { Switch, Route } from 'react-router-dom';
import React, { ReactElement } from 'react';

import Landing from '../landing';

const Routes = (): ReactElement => (
	<Switch>
		{/* PUBLIC CONTENTS */}
		<Route exact path="/" component={Landing} />

		{/*FALLBACK*/}
		{/* <Route exact path='/404' component={NotFound} /> */}
		{/* <Route path='*' component={NotFound} /> */}
	</Switch>
);

export default Routes;
