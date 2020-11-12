import React, { useState } from 'react';

import AppHeader from 'common/app.header';
import NetworthFooter from 'auth/views/auth.footer';
import AppSidebar from '../layouts/inc/app.sidebar';

import 'assets/css/networth/networth.scss';

const NetworthLayout: React.FC = ({ children }) => {
  const [openNav, setOpenNav] = useState<boolean>(false);

  return (
    <>
      <AppHeader toggleMenu={() => setOpenNav(!openNav)} open={openNav} />
      <AppSidebar open={openNav} />
      <div onClick={() => setOpenNav(false)} role='button'>
        {children}
      </div>
      <NetworthFooter />
    </>
  );
};

export default NetworthLayout;
