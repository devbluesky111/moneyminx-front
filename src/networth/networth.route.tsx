import React from 'react';

import AuthorizedProvider from 'provider/autorized.provider';

import Networth from './views/networth';
import { NetworthProvider } from './networth.context';

const NetworthRoute = () => {
  return (
    <NetworthProvider>
      <AuthorizedProvider>
        <Networth />
      </AuthorizedProvider>
    </NetworthProvider>
  );
};

export default NetworthRoute;
