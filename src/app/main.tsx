import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import useProfile from 'auth/hooks/useProfile';
import { auth } from 'auth/auth-context.types';
import { useAuthDispatch } from 'auth/auth.context';

import AppRoute from './app.route';
import { storage } from './app.storage';
import { StorageKey } from './app.types';

import './app.i18n';

export default function Main() {
  const dispatch = useAuthDispatch();
  useProfile();

  useEffect(() => {
    const { data, error } = storage.get(StorageKey.AUTH);
    if (!error) {
      dispatch({ type: auth.LOGIN_SUCCESS, payload: data });
    }
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback='....'>
        <div className='app-wrapper'>
          <AppRoute />
        </div>
      </Suspense>
    </Router>
  );
}
