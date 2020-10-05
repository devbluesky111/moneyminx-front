import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Account from './views/account';
import { AccountProvider } from './account.context';

function AccountRoute() {
  return (
    <AccountProvider>
      <Switch>
        <Route exact path='/account' component={Account} />
        <Route exact path='/account/404' component={NotFound} />
        <Redirect to='/account/404' />
      </Switch>
    </AccountProvider>
  );
}

function NotFound() {
  return <div>NOT FOUND </div>;
}

export default AccountRoute;
