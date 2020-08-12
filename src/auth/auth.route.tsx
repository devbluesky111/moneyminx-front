import React from 'react';
import { NotFound } from 'website/views';
import { Switch, Redirect, Route } from 'react-router-dom';

import { authRouteConstants } from './authRouteConstants';
import { Login, SessionExpired, ForgotPassword, CreateNewPassword, ExpiredLink } from './views';

const { LOGIN, NOT_FOUND, SESSION_EXPIRED, FORGOT_PASSWORD, CREATE_NEW_PASSWORD, EXPIRED_LINK } = authRouteConstants;
const AuthRoute = () => {
  return (
    <Switch>
      <Route exact path={LOGIN} component={Login} />
      <Route exact path={SESSION_EXPIRED} component={SessionExpired} />
      <Route exact path={FORGOT_PASSWORD} component={ForgotPassword} />
      <Route exact path={CREATE_NEW_PASSWORD} component={CreateNewPassword} />
      <Route exact path={EXPIRED_LINK} component={ExpiredLink} />
      <Route exact path={NOT_FOUND} component={NotFound} />
      <Redirect to={NOT_FOUND} />
    </Switch>
  );
};

export default AuthRoute;
