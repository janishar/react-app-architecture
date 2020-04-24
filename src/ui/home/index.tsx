import React, { ReactElement, useEffect, Fragment } from 'react';
import Routes from './routes';
import { useStateSelector } from '@core/reducers';
import { useHistory } from 'react-router-dom';

export default function Component(): ReactElement {
  const { isLoggedIn } = useStateSelector((state) => state.authState);
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return isLoggedIn ? <Routes /> : <Fragment />;
}
