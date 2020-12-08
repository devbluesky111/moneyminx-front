import { Router } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';

import history from 'app/app.history';
import useProfile from 'auth/hooks/useProfile';
import { auth } from 'auth/auth-context.types';
import { useAuthDispatch } from 'auth/auth.context';
import useAnalytics from 'common/hooks/useAnalytics';
import useAccountRefresh from 'common/hooks/useAccountRefresh';

import './app.i18n';
import AppRoute from './app.route';
import { storage } from './app.storage';
import { StorageKey } from './app.types';

export default function Main() {
  useProfile();
  useAnalytics();
  useAccountRefresh();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    const { data, error } = storage.get(StorageKey.AUTH);
    if (!error) {
      dispatch({ type: auth.LOGIN_SUCCESS, payload: data });
    }
  }, [dispatch]);

  return (
    <Router history={history}>
      <Suspense fallback='....'>
        <div className='app-wrapper'>
          <AppRoute />
        </div>
      </Suspense>
    </Router>
  );
}
