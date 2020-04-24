import React, { ReactElement, useEffect } from 'react';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { sendExample } from './actions';
import { useStateSelector } from '@core/reducers';

export default function Component({ exampleProp }: { exampleProp: any }): ReactElement {
  const classes = useStyles();
  const appState = useStateSelector((state) => state.appState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendExample.action('Example Message'));
  }, [dispatch]);

  return <div className={classes.root}></div>;
}
