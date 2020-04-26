import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useStateSelector } from '@core/reducers';
import { Roles } from '@ui/auth/reducer';
import { checkRole } from '@utils/appUtils';
import Landing from '@ui/landing';
import NotFound from '@ui/notfound';
import BlogList from '@ui/bloglist';
import BlogPage from '@ui/blogpage';
import WriterMyBlogs from '@ui/writer/myblogs';
import WritingPad from '@ui/writer/writingpad';
import EditorBlogs from '@ui/editor/blogs';

export default function Routes(): ReactElement {
  const { data } = useStateSelector(({ authState }) => authState);

  const isWriter = checkRole(data?.user, Roles.WRITER);
  const isEditor = checkRole(data?.user, Roles.EDITOR);

  return (
    <Switch>
      {/* PUBLIC CONTENTS */}
      <Route exact path="/" component={Landing} />
      <Route exact path="/blogs" component={BlogList} />
      <Route exact path="/blog/:endpoint" component={BlogPage} />
      {<Route exact path="/404" component={NotFound} />}

      {/* PRIVATE CONTENTS */}
      {isWriter && <Route exact path="/writer/blogs" component={WriterMyBlogs} />}
      {isWriter && <Route exact path="/write/blog" component={WritingPad} />}
      {isEditor && <Route exact path="/editor/blogs" component={EditorBlogs} />}

      {/*FALLBACK*/}
      {<Route path="*" component={NotFound} />}
    </Switch>
  );
}
