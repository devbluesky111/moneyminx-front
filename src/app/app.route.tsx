import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Login, Signup } from 'auth';
import Setting from 'setting/setting';
import AuthRoute from 'auth/auth.route';
import NotFound from 'website/views/not-found';
import WebsiteRoute from 'website/website.route';
import AccountRoute from 'account/account.route';
import {
  Home,
  About,
  Notice,
  Privacy,
  Pricing,
  Security,
  TermNService,
  FeaturesCryptos,
  FeaturesNetWorth,
  FeaturesAllocations,
  FeaturesSyncedManual,
  FeaturesMulticurrency,
  FeaturesTransactionHistory,
} from 'website/views';
import { ForgotPassword } from 'auth/views';
import NetworthRoute from 'networth/networth.route';
// import AuthorizedRoute from 'routes/authorized.route';
import AllocationRoute from 'allocation/allocation.route';

import {
  TokenExpired,
  ResetPassword,
  StripeSuccess,
  StripeFailure,
  AccountSetting,
  ConnectAccount,
  Subscription,
  SubscriptionReview,
} from './app.view';
import { appRouteConstants } from './app-route.constant';

const {
  home,
  web: { SECURITY },
  features: {
    FEATURES_NET_WORTH,
    FEATURES_ALLOCATIONS,
    FEATURES_CRYPTOS,
    FEATURES_SYNCED_MANUAL,
    FEATURES_MULTICURRENCY,
    FEATURES_TRANSACTION_HISTORY,
  },
  account: { ACCOUNT },
  settings: { SETTINGS },
  subscription: { SUBSCRIPTION, REVIEW },
  networth: { NET_WORTH },
  allocation: { ALLOCATION },
  misc: { STRIPE_FAILURE, STRIPE_SUCCESS },
  auth: { DEF, LOGIN, SIGNUP, FORGOT_PASSWORD, RESET_PASSWORD, TOKEN_EXPIRED, CONNECT_ACCOUNT, ACCOUNT_SETTING },
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

        <Route path={ACCOUNT}>
          <AccountRoute />
        </Route>

        <Route path={ALLOCATION}>
          <AllocationRoute />
        </Route>

        <Route exact path={'/about'} component={About} />
        <Route exact path={LOGIN} component={Login} />
        <Route exact path={SIGNUP} component={Signup} />
        <Route exact path={'/notices'} component={Notice} />
        <Route exact path={'/privacy'} component={Privacy} />
        <Route exact path={'/pricing'} component={Pricing} />
        <Route exact path={'/terms'} component={TermNService} />
        <Route exact path={FORGOT_PASSWORD} component={ForgotPassword} />
        <Route exact path={SETTINGS} component={Setting} />
        <Route exact path={SUBSCRIPTION} component={Subscription} />
        <Route exact path={REVIEW} component={SubscriptionReview} />
        <Route exact path={SECURITY} component={Security} />
        <Route exact path={FEATURES_NET_WORTH} component={FeaturesNetWorth} />
        <Route exact path={FEATURES_ALLOCATIONS} component={FeaturesAllocations} />
        <Route exact path={FEATURES_SYNCED_MANUAL} component={FeaturesSyncedManual} />
        <Route exact path={FEATURES_CRYPTOS} component={FeaturesCryptos} />
        <Route exact path={FEATURES_MULTICURRENCY} component={FeaturesMulticurrency} />
        <Route exact path={FEATURES_TRANSACTION_HISTORY} component={FeaturesTransactionHistory} />
        <Route exact path={TOKEN_EXPIRED} component={TokenExpired} />
        <Route exact path={STRIPE_SUCCESS} component={StripeSuccess} />
        <Route exact path={STRIPE_FAILURE} component={StripeFailure} />
        <Route exact path={RESET_PASSWORD} component={ResetPassword} />
        <Route exact path={CONNECT_ACCOUNT} component={ConnectAccount} />
        <Route exact path={ACCOUNT_SETTING} component={AccountSetting} />
        <Route exact path={NET_WORTH} component={NetworthRoute} />
        <Route exact path={'/404'} component={NotFound} />
        <Redirect to='/404' />
      </Switch>
    </>
  );
}

export default AppRoute;
