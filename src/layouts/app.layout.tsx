import React, { useState } from 'react';

import AppFooter from './inc/app.footer';
import AppHeader from './inc/app.header';
import AppSidebar from './inc/app.sidebar';

const AppLayout: React.FC = ({ children }) => {
  const [openNav, setOpenNav] = useState<boolean>(false);

  return (
    <>
      <AppHeader toggleMenu={() => setOpenNav(!openNav)} />
      <AppSidebar open={openNav} />
      <div onClick={() => setOpenNav(false)} role='button'>
        {children}
      </div>
      <AppFooter />
    </>
  );
};

export default AppLayout;
