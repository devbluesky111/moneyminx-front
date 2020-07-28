import React from 'react';
import WebsiteHeader from './inc/website.header';
import WebsiteFooter from './inc/website.footer';

const WebsiteLayout: React.FC = ({ children }) => {
  return (
    <>
      <WebsiteHeader />
      {children}
      <WebsiteFooter />
    </>
  );
};

export default WebsiteLayout;
