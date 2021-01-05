import { Router } from 'react-router-dom';
import ReactPixel from 'react-facebook-pixel';
import React, { Suspense, useEffect } from 'react';

import env from 'app/app.env';
import history from 'app/app.history';
import { auth } from 'auth/auth-context.types';
import { useAuthDispatch } from 'auth/auth.context';
import useAnalytics from 'common/hooks/useAnalytics';

import './app.i18n';
import MainRoute from './main.route';
import { storage } from './app.storage';
import { StorageKey } from './app.types';

export default function Main() {
  useAnalytics();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    ReactPixel.init(env.FACEBOOK_PIXEL_CODE, {} as any, {
      autoConfig: true,
      debug: false,
    });
  }, []);

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
          <MainRoute />
        </div>
      </Suspense>
    </Router>
  );
}
