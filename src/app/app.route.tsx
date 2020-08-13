import React from 'react';
import AuthRoute from 'auth/auth.route';
import NotFound from 'website/views/not-found';
import { Switch, Route, Redirect } from 'react-router-dom';

import WebsiteRoute from 'website/website.route';
import { appRouteConstants } from './app-route.constant';
import { Home, TermNService, Notice, Privacy } from 'website/views';

const {
  auth: { def },
  home,
} = appRouteConstants;

function AppRoute() {
  return (
    <>
      <Switch>
        <Route exact path={home}>
          <Home />
        </Route>

        <Route path='/w'>
          <WebsiteRoute />
        </Route>

        <Route path={def}>
          <AuthRoute />
        </Route>

        <Route exact path={'/terms'} component={TermNService} />
        <Route exact path={'/notice'} component={Notice} />
        <Route exact path={'/privacy'} component={Privacy} />

        <Route exact path={'/404'} component={NotFound} />
        <Redirect to='/404' />
      </Switch>
    </>
  );
}

export default AppRoute;
