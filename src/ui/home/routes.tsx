import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import WriterMyBlogs from '@ui/writer/myblogs';

const Routes = (): ReactElement => (
  <Switch>
    <Route exact path="/writer/blogs" component={WriterMyBlogs} />
  </Switch>
);

export default Routes;
