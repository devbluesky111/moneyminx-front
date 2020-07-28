import React from 'react';
import Website from 'website/website';
import AuthRoute from 'auth/auth.route';
import NotFound from 'website/views/not-found';
import { Switch, Route } from 'react-router-dom';

import { appRouteConstants } from './app-route.constant';

const {
  auth: { def },
} = appRouteConstants;

function AppRoute() {
  const dashboardPath = '(/|/dashboard)';

  return (
    <>
      <Switch>
        <Route path={def}>
          <AuthRoute />
        </Route>

        <Route exact path={dashboardPath} component={Website} />
        <Route exact path={'/404'} component={NotFound} />
      </Switch>
    </>
  );
}

export default AppRoute;
