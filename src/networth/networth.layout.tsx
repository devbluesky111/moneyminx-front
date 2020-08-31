import React from 'react';

import NetworthHeader from './views/networth.header';
import NetworthFooter from './views/networth.footer';
import NetworthSidebar from './views/networth-sidebar';

import 'assets/css/networth/networth.scss';

const NetworthLayout: React.FC = ({ children }) => {
  return (
    <>
      <NetworthHeader />
      <NetworthSidebar />
      {children}
      <NetworthFooter />
    </>
  );
};

export default NetworthLayout;
