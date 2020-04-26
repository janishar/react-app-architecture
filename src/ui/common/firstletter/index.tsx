import React, { ReactElement } from 'react';
import useStyles from './style';
import { Avatar } from '@material-ui/core';

export default function FirstLetter({ text }: { text: string }): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {text && <Avatar className={classes.primary}>{text.toUpperCase()[0]}</Avatar>}
    </div>
  );
}
