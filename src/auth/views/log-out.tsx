import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthState } from 'auth/auth.types';
import { useAuthState } from 'auth/auth.context';
import CircularSpinner from 'common/components/spinner/circular-spinner';

const LogOut = () => {
  const { authState } = useAuthState();

  if (authState === AuthState.LOGGING_OUT || authState === AuthState.INITIAL) {
    return <CircularSpinner />;
  }

  if (authState === AuthState.LOGGED_OUT) {
    return <Redirect to='/login' />;
  }

  return null;
};

export default LogOut;
