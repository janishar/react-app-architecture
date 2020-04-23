import React, { ReactElement, useState, ChangeEvent, Fragment, useEffect } from 'react';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { useStateSelector } from '@core/reducers';
import { validateEmail } from '@utils/appUtils';
import { basicLogin, removeMessage } from './actions';
import {
  LinearProgress,
  DialogTitle,
  Dialog,
  Typography,
  Divider,
  DialogContent,
  Button,
  DialogActions,
  TextField,
  Paper,
  PaperProps,
} from '@material-ui/core';

import Snackbar from '@ui/common/snackbar';

export default function Component({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): ReactElement | null {
  const { isLoggedIn, isLoggingIn, message } = useStateSelector(({ authState }) => authState);

  const classes = useStyles();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    isEmailError: false,
    emailError: '',
    isPasswordError: false,
    passwordError: '',
  });

  useEffect(() => {
    if (isLoggedIn) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleCredentialChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault(); // to prevent from loosing focus
    setCredentials({
      ...credentials,
      isEmailError: false,
      emailError: '',
      isPasswordError: false,
      passwordError: '',
      [name]: event.target.value,
    });
  };

  const handleBasicLogin = () => {
    const validations = { ...credentials };
    let error = false;

    if (validations.email.length == 0) {
      validations.emailError = 'Email should not be empty';
      validations.isEmailError = true;
      error = true;
    }

    if (!validateEmail(validations.email)) {
      validations.emailError = 'Email is not valid';
      validations.isEmailError = true;
      error = true;
    }

    if (validations.password.length < 6) {
      validations.passwordError = 'Password not valid';
      validations.isPasswordError = true;
      error = true;
    }

    if (error) {
      setCredentials(validations);
    } else {
      dispatch(removeMessage.action());
      dispatch(
        basicLogin({
          email: credentials.email,
          password: credentials.password,
        }),
      );
    }
  };

  if (isLoggedIn) return null;

  return (
    <Fragment>
      <Dialog
        onClose={onClose}
        open={open}
        PaperProps={{ className: classes.paper }}
        PaperComponent={PaperComponent}
      >
        {isLoggingIn && <LinearProgress color="secondary" />}
        <DialogTitle disableTypography={true}>
          {isLoggingIn ? (
            <Typography component="p" variant="subtitle1">
              Logging please wait...
            </Typography>
          ) : (
            <Typography component="p" variant="h6">
              Login
            </Typography>
          )}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              required={true}
              error={credentials.isEmailError}
              margin="normal"
              variant="outlined"
              id="email"
              label="Email"
              value={credentials.email}
              type="email"
              autoComplete="email"
              rows={1}
              autoFocus={true}
              disabled={isLoggingIn}
              helperText={credentials.emailError}
              onChange={handleCredentialChange('email')}
              fullWidth
            />
            <TextField
              required={true}
              error={credentials.isPasswordError}
              margin="normal"
              variant="outlined"
              id="password"
              label="Password"
              value={credentials.password}
              type="password"
              autoComplete="current-password"
              rows={1}
              disabled={isLoggingIn}
              helperText={credentials.passwordError}
              onChange={handleCredentialChange('password')}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBasicLogin} color="primary">
            LOGIN
          </Button>
          <Button onClick={onClose} color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
      {message && (
        <Snackbar
          message={message.text}
          variant={message.type}
          onClose={() => dispatch(removeMessage.action())}
        />
      )}
    </Fragment>
  );
}

const PaperComponent = (props: PaperProps) => <Paper {...props} />;
