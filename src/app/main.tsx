import { Router } from 'react-router-dom';
import ReactPixel from 'react-facebook-pixel';
import React, { Suspense, useEffect } from 'react';

import env from 'app/app.env';
import history from 'app/app.history';
import useCrisp from 'common/hooks/useCrisp';
import useProfile from 'auth/hooks/useProfile';
import { auth } from 'auth/auth-context.types';
import useAnalytics from 'common/hooks/useAnalytics';
import useConnectionInfo from 'common/hooks/useConnectionInfo';
import { useAuthDispatch, useAuthState } from 'auth/auth.context';

import './app.i18n';
import AppRoute from './app.route';
import { storage } from './app.storage';
import { StorageKey } from './app.types';

export default function Main() {
  useProfile();
  useAnalytics();
  useConnectionInfo();
  useCrisp();
  const dispatch = useAuthDispatch();
  const { user } = useAuthState();

  useEffect(() => {
    ReactPixel.init(env.FACEBOOK_PIXEL_CODE, {} as any, {
      autoConfig: true,
      debug: false,
    });
  }, []);

  const email = user?.email;

  useEffect(() => {
    if (email && window.$crisp) {
      window.$crisp.push(['set', 'user:email', email]);
    }
  }, [email]);

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
