import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { signout } from 'auth/auth.service';
import { AuthState } from 'auth/auth.types';
import { useAuthDispatch, useAuthState } from 'auth/auth.context';
import CircularSpinner from 'common/components/spinner/circular-spinner';

const LogOut = () => {
  const dispatch = useAuthDispatch();
  const { authState } = useAuthState();

  useEffect(() => {
    const signOut = async () => {
      await signout(dispatch);
    };
    signOut();
  }, [dispatch]);

  if (authState === AuthState.LOGGING_OUT || authState === AuthState.INITIAL) {
    return <CircularSpinner />;
  }

  if (authState === AuthState.LOGGED_OUT) {
    return <Redirect to='/login' />;
  }

  return null;
};

export default LogOut;
