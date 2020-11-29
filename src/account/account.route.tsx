import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { NotFound } from 'website/views';

import AccountDetail from './views/account-detail';
import { AccountProvider } from './account.context';

function AccountRoute() {
  return (
    <AccountProvider>
      <Switch>
        <Route exact path='/account-details/:accountId' component={AccountDetail} />
        <Route exact path='/account-detail/404' component={NotFound} />
        <Redirect to='/account/404' />
      </Switch>
    </AccountProvider>
  );
}

export default AccountRoute;
