import React from 'react';
import { Login, Signup } from 'auth';
import AuthRoute from 'auth/auth.route';
import NotFound from 'website/views/not-found';
import WebsiteRoute from 'website/website.route';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home, TermNService, Notice, Privacy, About, Pricing } from 'website/views';

import { appRouteConstants } from './app-route.constant';

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

        <Route exact path={'/about'} component={About} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/signup'} component={Signup} />
        <Route exact path={'/notices'} component={Notice} />
        <Route exact path={'/privacy'} component={Privacy} />
        <Route exact path={'/pricing'} component={Pricing} />
        <Route exact path={'/terms'} component={TermNService} />

        <Route exact path={'/404'} component={NotFound} />
        <Redirect to='/404' />
      </Switch>
    </>
  );
}

export default AppRoute;
