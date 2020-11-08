import React, { useState } from 'react';

import AppHeader from 'common/app.header';
import NetworthFooter from 'auth/views/auth.footer';
import NetworthSidebar from './views/networth-sidebar';

import 'assets/css/networth/networth.scss';

const NetworthLayout: React.FC = ({ children }) => {
  const [openRightNav, setOpenRightNav] = useState<boolean>(false);
  const [openLeftNav, setOpenLeftNav] = useState<boolean>(false);

  return (
    <>
      <AppHeader
        toggleLeftMenu={() => setOpenLeftNav(!openLeftNav)}
        toggleRightMenu={() => setOpenRightNav(!openRightNav)}
      />
      <NetworthSidebar openLeft={openLeftNav} openRight={openRightNav} />
      {children}
      <NetworthFooter />
    </>
  );
};

export default NetworthLayout;
