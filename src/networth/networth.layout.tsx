import React, { useState } from 'react';

import NetworthHeader from './views/networth.header';
import NetworthFooter from './views/networth.footer';
import NetworthSidebar from './views/networth-sidebar';

import 'assets/css/networth/networth.scss';
import { NetworthProvider } from './networth.context';

const NetworthLayout: React.FC = ({ children }) => {
  const [openNav, setOpenNav] = useState<boolean>(false);

  return (
    <NetworthProvider>
      <NetworthHeader toggleMenu={() => setOpenNav(!openNav)} />
      <NetworthSidebar open={openNav} />
      {children}
      <NetworthFooter />
    </NetworthProvider>
  );
};

export default NetworthLayout;
