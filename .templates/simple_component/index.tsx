import React, { ReactElement } from 'react';
import useStyles from './style';

export default function Component(): ReactElement {
  const classes = useStyles();
  return <div className={classes.root}></div>;
}
