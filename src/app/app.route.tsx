import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Login, Signup } from 'auth';
import Setting from 'setting/setting';
import AuthRoute from 'auth/auth.route';
import NotFound from 'website/views/not-found';
import WebsiteRoute from 'website/website.route';
import { NetworthProvider } from 'networth/networth.context';
import { Home, TermNService, Notice, Privacy, About, Pricing, Security } from 'website/views';

import {
  Networth,
  TokenExpired,
  ResetPassword,
  StripeSuccess,
  StripeFailure,
  AccountSetting,
  ConnectAccount,
} from './app.view';
import { appRouteConstants } from './app-route.constant';
import AllocationRoute from 'allocation/allocation.route';

const {
  web: { SECURITY, NET_WORTH },
  auth: { DEF, RESET_PASSWORD, TOKEN_EXPIRED, CONNECT_ACCOUNT, ACCOUNT_SETTING },
  misc: { STRIPE_FAILURE, STRIPE_SUCCESS },
  home,
  allocation: { ALLOCATION },
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

        <Route path={DEF}>
          <AuthRoute />
        </Route>

        <Route path={ALLOCATION}>
          <AllocationRoute />
        </Route>

        <Route exact path={'/about'} component={About} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/setting'} component={Setting} />
        <Route exact path={'/signup'} component={Signup} />
        <Route exact path={'/notices'} component={Notice} />
        <Route exact path={'/privacy'} component={Privacy} />
        <Route exact path={'/pricing'} component={Pricing} />
        <Route exact path={'/terms'} component={TermNService} />
        <Route exact path={SECURITY} component={Security} />
        <Route exact path={STRIPE_SUCCESS} component={StripeSuccess} />
        <Route exact path={STRIPE_FAILURE} component={StripeFailure} />
        <Route exact path={RESET_PASSWORD} component={ResetPassword} />
        <Route exact path={TOKEN_EXPIRED} component={TokenExpired} />
        <Route exact path={CONNECT_ACCOUNT} component={ConnectAccount} />
        <Route exact path={ACCOUNT_SETTING} component={AccountSetting} />
        <Route exact path={NET_WORTH}>
          <NetworthProvider>
            <Networth />
          </NetworthProvider>
        </Route>
        <Route exact path={'/404'} component={NotFound} />
        <Redirect to='/404' />
      </Switch>
    </>
  );
}

export default AppRoute;
