import React, { ReactElement } from 'react';
import useStyles from './style';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Box } from '@material-ui/core';

type BreakPoints = boolean | 12 | 6 | 4 | 2 | 'auto' | 1 | 3 | 5 | 7 | 8 | 9 | 10 | 11 | undefined;

type Props = {
  xs?: BreakPoints;
  sm?: BreakPoints;
  md?: BreakPoints;
  count?: number;
};

export const CardListPlaceholder = ({
  xs = 12,
  sm = 6,
  md = 4,
  count = 6,
}: Props): ReactElement => {
  const classes = useStyles();
  return (
    <Grid container justify="center">
      {new Array(count).fill(0).map((_, index) => (
        <Grid key={index} item xs={xs} sm={sm} md={md}>
          <Box width="100%" my={2} className={classes.box}>
            <Skeleton variant="rect" width="100%" height={200} />
            <React.Fragment>
              <Skeleton />
              <Skeleton width="60%" />
            </React.Fragment>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
