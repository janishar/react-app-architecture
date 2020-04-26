import React, { ReactElement, useState, Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useStateSelector } from '@core/reducers';
import { removeMessage } from './actions';

import Snackbar from '@ui/common/snackbar';
import LoginDialog from './login';
import SignupDialog from './singup';

export default function AuthDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): ReactElement | null {
  const dispatch = useDispatch();
  const { isLoggedIn, message } = useStateSelector(({ authState }) => authState);

  const [signup, setSignup] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      onClose();
      setSignup(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  if (isLoggedIn) return null; // important to remount the auth with fresh state
  return (
    <Fragment>
      <LoginDialog
        open={open && !signup}
        onClose={() => {
          if (!signup) onClose();
        }}
        onSignup={() => setSignup(true)}
      />
      <SignupDialog
        open={open && signup}
        onClose={() => onClose()}
        onLogin={() => setSignup(false)}
      />
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
