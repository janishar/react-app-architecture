import React, { ReactElement, useState, ChangeEvent } from 'react';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { useStateSelector } from '@core/reducers';
import { validateEmail, validateUrl } from '@utils/appUtils';
import { basicSignup, removeMessage, SignupRequestBody } from './actions';
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

export default function SignupDialog({
  open,
  onClose,
  onLogin,
}: {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}): ReactElement | null {
  const { isLoggingIn } = useStateSelector(({ authState }) => authState);

  const classes = useStyles();
  const dispatch = useDispatch();

  const defaultFormState = {
    name: '',
    email: '',
    password: '',
    profilePicUrl: '',
    isNameError: false,
    isProfilePicUrlError: false,
    isEmailError: false,
    isPasswordError: false,
    nameError: '',
    emailError: '',
    passwordError: '',
    profilePicUrlError: '',
  };

  const [credentials, setCredentials] = useState(defaultFormState);

  const handleCredentialChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault(); // to prevent from loosing focus
    setCredentials({
      ...credentials,
      isNameError: false,
      isProfilePicUrlError: false,
      isEmailError: false,
      isPasswordError: false,
      nameError: '',
      emailError: '',
      passwordError: '',
      profilePicUrlError: '',
      [name]: e.target.value,
    });
  };

  const handleBasicSignup = () => {
    const validations = { ...credentials };
    validations.name = validations.name.trim();
    validations.email = validations.email.trim();
    validations.password = validations.password.trim();
    validations.profilePicUrl = validations.profilePicUrl.trim();
    let error = false;

    if (validations.name.trim().length === 0) {
      validations.nameError = 'Name should not be empty';
      validations.isNameError = true;
      error = true;
    }

    if (validations.name.trim().length > 100) {
      validations.nameError = 'Name is too large';
      validations.isNameError = true;
      error = true;
    }

    if (validations.email.trim().length === 0) {
      validations.emailError = 'Email should not be empty';
      validations.isEmailError = true;
      error = true;
    }

    if (!validateEmail(validations.email)) {
      validations.emailError = 'Email is not valid';
      validations.isEmailError = true;
      error = true;
    }

    if (validations.password.trim().length < 6) {
      validations.passwordError = 'Password not valid';
      validations.isPasswordError = true;
      error = true;
    }

    if (validations.profilePicUrl.trim().length > 0 && !validateUrl(validations.profilePicUrl)) {
      validations.profilePicUrlError = 'URL is not valid';
      validations.isProfilePicUrlError = true;
      error = true;
    }

    if (error) {
      setCredentials(validations);
    } else {
      dispatch(removeMessage.action());
      const singupBody: SignupRequestBody = {
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
      };
      if (validations.profilePicUrl) singupBody.profilePicUrl = validations.profilePicUrl;
      dispatch(basicSignup(singupBody));
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
            Creating account please wait...
          </Typography>
        ) : (
          <div>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography component="span" variant="h6">
                  Signup Form
                </Typography>
              </Box>
              <Box>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    onLogin();
                    setCredentials({ ...defaultFormState });
                  }}
                >
                  LOGIN
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
            error={credentials.isNameError}
            margin="normal"
            variant="outlined"
            id="name"
            label="Name"
            value={credentials.name}
            type="text"
            autoComplete="text"
            rows={1}
            autoFocus={true}
            disabled={isLoggingIn}
            helperText={credentials.nameError}
            onChange={handleCredentialChange('name')}
            fullWidth
          />
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
          <TextField
            required={false}
            error={credentials.isProfilePicUrlError}
            margin="normal"
            variant="outlined"
            id="profilePicUrl"
            label="(Optional) Profile Pic URL"
            value={credentials.profilePicUrl}
            type="text"
            autoComplete="text"
            rows={1}
            disabled={isLoggingIn}
            helperText={credentials.profilePicUrlError}
            onChange={handleCredentialChange('profilePicUrl')}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBasicSignup} color="primary">
          SIGNUP
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
