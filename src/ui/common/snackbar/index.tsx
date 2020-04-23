import React, { ReactElement, MouseEvent, useState, SyntheticEvent } from 'react';
import useStyles from './style';
import clsx from 'clsx';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Close as CloseIcon,
} from '@material-ui/icons';
import {
  SnackbarContent,
  IconButton,
  Snackbar as MaterialSnackbar,
  SnackbarCloseReason,
} from '@material-ui/core';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

type PropSnackbarContent = {
  className?: string;
  message: string;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  variant?: 'success' | 'warning' | 'error' | 'info';
};

function SnackbarContentWrapper({
  className,
  message,
  onClose,
  variant = 'success',
  ...other
}: PropSnackbarContent): ReactElement {
  const classes = useStyles();
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

type PropSnackbar = {
  message: string;
  onClose?: () => void;
  variant?: 'success' | 'warning' | 'error' | 'info';
};

export default function Snackbar({ message, onClose, variant }: PropSnackbar): ReactElement {
  const [open, setOpen] = useState(true);

  const handleClose: (event: SyntheticEvent<any>, reason: SnackbarCloseReason | null) => void = (
    event,
    reason,
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <div>
      <MaterialSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContentWrapper
          onClose={(event) => handleClose(event, null)}
          variant={variant === undefined ? 'success' : variant}
          message={message}
        />
      </MaterialSnackbar>
    </div>
  );
}
