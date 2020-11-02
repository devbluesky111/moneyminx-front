import React, { useState } from 'react';

import AppHeader from 'common/app.header';
import NetworthFooter from 'auth/views/auth.footer';
import NetworthSidebar from './views/networth-sidebar';

import 'assets/css/networth/networth.scss';

const NetworthLayout: React.FC = ({ children }) => {
  const [openNav, setOpenNav] = useState<boolean>(false);

  return (
    <>
      <AppHeader toggleMenu={() => setOpenNav(!openNav)} />
      <NetworthSidebar open={openNav} />
      {children}
      <NetworthFooter />
    </>
  );
};

export default NetworthLayout;
