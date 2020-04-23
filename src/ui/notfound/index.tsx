import React, { ReactElement } from 'react';
import useStyles from './style';
import { DirectionsBoatRounded } from '@material-ui/icons';
import { Box, Typography } from '@material-ui/core';

export default function Component({ message = 'Not Found' }: { message?: string }): ReactElement {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <div>
        <DirectionsBoatRounded className={classes.icon} />
        <Typography gutterBottom component="p" variant="subtitle1" className={classes.message}>
          {message}
        </Typography>
      </div>
    </Box>
  );
}
