import React from 'react';
import Website from 'website/website';
import AuthRoute from 'auth/auth.route';
import NotFound from 'website/views/not-found';
import { Switch, Route, Redirect } from 'react-router-dom';

import WebsiteRoute from 'website/website.route';
import { appRouteConstants } from './app-route.constant';
import { Home } from 'website/views';

const {
  auth: { def },
  home,
} = appRouteConstants;

function AppRoute() {
  const dashboardPath = '(/|/dashboard)';

  return (
    <>
      <Switch>
        <Route path={home} component={Home} />

        <Route path={def}>
          <AuthRoute />
        </Route>

        <Route exact path={dashboardPath} component={Website} />

        <Route path='/w'>
          <WebsiteRoute />
        </Route>

        <Route exact path={'/404'} component={NotFound} />
        <Redirect to='/404' />
      </Switch>
    </>
  );
}

export default AppRoute;
