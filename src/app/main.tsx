import AppRoute from './app.route';
import { storage } from './app.storage';
import { auth } from 'auth/auth-context.types';
import { StorageKey } from './app.types';
import React, { Suspense, useEffect } from 'react';
import { useAuthDispatch } from 'auth/auth.context';
import { BrowserRouter as Router } from 'react-router-dom';

import './app.i18n';
import useProfile from 'auth/hooks/useProfile';

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
