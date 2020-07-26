import React from 'react';
import PrivateRoute from 'app/app.private-route';
import { Switch, Redirect, Route } from 'react-router-dom';
import { appRouteConstants } from 'app/app-route.constant';

import { Login, Register, Profile, LogOut } from './views';

const {
  auth: { login, signup, def, me, logout },
  misc: { notFound },
} = appRouteConstants;
const AuthRoute = () => {
  return (
    <Switch>
      <Route exact path={login} component={Login} />
      <Route exact path={signup} component={Register} />
      <PrivateRoute exact path={def} component={Profile} />
      <PrivateRoute exact path={me} component={Profile} />
      <PrivateRoute exact path={logout} component={LogOut} />
      <Redirect to={notFound} />
    </Switch>
  );
};

export default AuthRoute;
