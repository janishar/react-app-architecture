import React, { ReactElement, forwardRef, Ref, MouseEvent } from 'react';
import {
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  Paper,
  PaperProps,
} from '@material-ui/core';
import useStyles from './style';
import { Close as CloseIcon } from '@material-ui/icons';
import { BlogDetail } from 'app-types';
import { TransitionProps } from '@material-ui/core/transitions';
import Markdown from '@ui/common/markdown';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = { blog: BlogDetail; open: boolean; onClose: (event: MouseEvent<HTMLElement>) => void };

export default function BlogPreview({ blog, open, onClose }: Props): ReactElement {
  const classes = useStyles();
  return (
    <Dialog
      fullScreen
      open={open}
      TransitionComponent={Transition}
      PaperProps={{ className: classes.paper }}
      PaperComponent={PaperComponent}
    >
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {blog.title}
          </Typography>
          <Button color="inherit" onClick={onClose}>
            Done
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={8} className={classes.blogContent}>
          {blog?.draftText && <Markdown text={blog.draftText} />}
        </Grid>
      </Grid>
    </Dialog>
  );
}

const PaperComponent = (props: PaperProps) => <Paper {...props} />;
