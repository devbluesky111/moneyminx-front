import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Website from './website';
import { WebsiteProvider } from './website.context';

function WebsiteRoute() {
  return (
    <WebsiteProvider>
      <Switch>
        <Route exact path='/website' component={Website} />
        <Route exact path='/website/404' component={NotFound} />
        <Redirect to='/website/404' />
      </Switch>
    </WebsiteProvider>
  );
}

function NotFound() {
  return <div>NOT FOUND </div>;
}

export default WebsiteRoute;
