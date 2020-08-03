import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Website from './website';
import { NotFound, Notice, Privacy, TermNService, Security } from './views';
import { WebsiteProvider } from './website.context';
import { websiteRouteConstant } from './website.constant';

const { DEF, NOTICE, NOT_FOUND, PRIVACY, TERMS, SECURITY } = websiteRouteConstant;

function WebsiteRoute() {
  return (
    <WebsiteProvider>
      <Switch>
        <Route exact path={DEF} component={Website} />
        <Route exact path={NOTICE} component={Notice} />
        <Route exact path={PRIVACY} component={Privacy} />
        <Route exact path={TERMS} component={TermNService} />
        <Route exact path={SECURITY} component={Security} />
        <Route exact path={NOT_FOUND} component={NotFound} />
        <Redirect to={NOT_FOUND} />
      </Switch>
    </WebsiteProvider>
  );
}

export default WebsiteRoute;
