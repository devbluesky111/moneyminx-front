import React from 'react';

import Networth from './views/networth';
import { NetworthProvider } from './networth.context';

const NetworthRoute = () => {
  return (
    <NetworthProvider>
      <Networth />
    </NetworthProvider>
  );
};

export default NetworthRoute;
