import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '@ui/landing';
import NotFound from '@ui/notfound';
import BlogList from '@ui/bloglist';
import BlogPage from '@ui/blogpage';

const Routes = (): ReactElement => (
  <Switch>
    {/* PUBLIC CONTENTS */}
    <Route exact path="/" component={Landing} />
    <Route exact path="/blogs" component={BlogList} />
    <Route exact path="/blog/:endpoint" component={BlogPage} />

    {/*FALLBACK*/}
    {<Route exact path="/404" component={NotFound} />}
    {<Route path="*" component={NotFound} />}
  </Switch>
);

export default Routes;
