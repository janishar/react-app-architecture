import React, { ReactElement, MouseEvent } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Paper,
  PaperProps,
} from '@material-ui/core';
import useStyles from './style';

type Props = {
  open: boolean;
  onClose?: (event: MouseEvent<HTMLElement>) => void;
  title: string;
  message: string;
  onPositiveAction: (event: MouseEvent<HTMLElement>) => void;
  onNegativeAction: (event: MouseEvent<HTMLElement>) => void;
  positionText?: string;
  negativeText?: string;
};

export default function ConfirmationDialog({
  open,
  onClose,
  title,
  message,
  onPositiveAction,
  onNegativeAction,
  positionText = 'Yes',
  negativeText = 'No',
}: Props): ReactElement {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: classes.paper }}
      PaperComponent={PaperComponent}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onPositiveAction} color="primary">
          {positionText}
        </Button>
        <Button onClick={onNegativeAction} color="primary" autoFocus>
          {negativeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const PaperComponent = (props: PaperProps) => <Paper {...props} />;
