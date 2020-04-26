import React, { ReactElement, useState, ChangeEvent } from 'react';
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
  Box,
} from '@material-ui/core';

export default function LoginDialog({
  open,
  onClose,
  onSignup,
}: {
  open: boolean;
  onClose: () => void;
  onSignup: () => void;
}): ReactElement | null {
  const { isLoggingIn } = useStateSelector(({ authState }) => authState);

  const classes = useStyles();
  const dispatch = useDispatch();

  const defaultFormState = {
    email: '',
    password: '',
    isEmailError: false,
    emailError: '',
    isPasswordError: false,
    passwordError: '',
  };

  const [credentials, setCredentials] = useState(defaultFormState);

  const handleCredentialChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault(); // to prevent from loosing focus
    setCredentials({
      ...credentials,
      isEmailError: false,
      emailError: '',
      isPasswordError: false,
      passwordError: '',
      [name]: e.target.value,
    });
  };

  const handleBasicLogin = () => {
    const validations = { ...credentials };
    validations.email = validations.email.trim();
    validations.password = validations.password.trim();
    let error = false;

    if (validations.email.length === 0) {
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

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{ className: classes.paper }}
      PaperComponent={PaperComponent}
      maxWidth="xs"
    >
      {isLoggingIn && <LinearProgress color="secondary" />}
      <DialogTitle disableTypography={true}>
        {isLoggingIn ? (
          <Typography component="p" variant="subtitle1">
            Logging please wait...
          </Typography>
        ) : (
          <div>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography component="span" variant="h6">
                  Login Form
                </Typography>
              </Box>
              <Box>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    onSignup();
                    setCredentials({ ...defaultFormState });
                  }}
                >
                  SIGNUP
                </Button>
              </Box>
            </Box>
          </div>
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
        <Button
          onClick={() => {
            onClose();
            setCredentials({ ...defaultFormState });
          }}
          color="primary"
        >
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const PaperComponent = (props: PaperProps) => <Paper {...props} />;
