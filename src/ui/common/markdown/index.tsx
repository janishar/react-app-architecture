import React, { ReactElement } from 'react';
import useStyles from './style';
import marked from 'marked';

export default function Markdown({ text }: { text: string }): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    </div>
  );
}
