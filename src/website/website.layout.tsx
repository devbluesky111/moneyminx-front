import React from 'react';
import WebsiteHeader from './inc/website.header';
import WebsiteFooter from './inc/website.footer';

const WebsiteLayout: React.FC = ({ children }) => {
  return (
    <div className='bg-lightBg'>
      <WebsiteHeader />
      <main>{children}</main>
      <WebsiteFooter />
    </div>
  );
};

export default WebsiteLayout;
