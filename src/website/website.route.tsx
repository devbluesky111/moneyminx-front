import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { WebsiteProvider } from './website.context';
import { websiteRouteConstant } from './website.constant';
import {
  Home,
  About,
  Notice,
  Privacy,
  Pricing,
  NotFound,
  Security,
  ExpiredLink,
  TermNService,
  ForgotPassword,
  CreateNewPassword,
  SubscriptionEnded,
  LoginSessionExpired,
  SubscriptionEndedTwo,
  SubscriptionEndedThree,
} from './views';

const {
  DEF,
  HOME,
  TERMS,
  ABOUT,
  NOTICE,
  PRIVACY,
  PRICING,
  SECURITY,
  NOT_FOUND,
  EXPIRED_LINK,
  FORGOT_PASSWORD,
  SUBSCRIPTION_ENDED,
  CREATE_NEW_PASSWORD,
  LOGIN_SESSION_EXPIRED,
  SUBSCRIPTION_ENDED_TWO,
  SUBSCRIPTION_ENDED_THREE,
} = websiteRouteConstant;

function WebsiteRoute() {
  return (
    <WebsiteProvider>
      <Switch>
        <Route exact path={DEF} component={Home} />
        <Route exact path={HOME} component={Home} />
        <Route exact path={ABOUT} component={About} />
        <Route exact path={NOTICE} component={Notice} />
        <Route exact path={PRIVACY} component={Privacy} />
        <Route exact path={PRICING} component={Pricing} />
        <Route exact path={SECURITY} component={Security} />
        <Route exact path={TERMS} component={TermNService} />
        <Route exact path={NOT_FOUND} component={NotFound} />
        <Route exact path={EXPIRED_LINK} component={ExpiredLink} />
        <Route exact path={FORGOT_PASSWORD} component={ForgotPassword} />
        <Route exact path={SUBSCRIPTION_ENDED} component={SubscriptionEnded} />
        <Route exact path={CREATE_NEW_PASSWORD} component={CreateNewPassword} />
        <Route exact path={LOGIN_SESSION_EXPIRED} component={LoginSessionExpired} />
        <Route exact path={SUBSCRIPTION_ENDED_TWO} component={SubscriptionEndedTwo} />
        <Route exact path={SUBSCRIPTION_ENDED_THREE} component={SubscriptionEndedThree} />
        <Redirect to={NOT_FOUND} />
      </Switch>
    </WebsiteProvider>
  );
}

export default WebsiteRoute;
