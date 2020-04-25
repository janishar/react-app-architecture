import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import WriterMyBlogs from '@ui/writer/myblogs';
import WritingPad from '@ui/writer/writingpad';

const Routes = (): ReactElement => (
  <Switch>
    <Route exact path="/writer/blogs" component={WriterMyBlogs} />
    <Route exact path="/write/blog" component={WritingPad} />
  </Switch>
);

export default Routes;
