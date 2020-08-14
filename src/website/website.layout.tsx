import React from 'react';
import WebsiteHeader from './inc/website.header';
import WebsiteFooter from './inc/website.footer';
import useScrollTop from 'common/hooks/useScrollTop';

const WebsiteLayout: React.FC = ({ children }) => {
  useScrollTop();
  return (
    <div className='bg-lightBg'>
      <WebsiteHeader />
      <main className='main-content'>{children}</main>
      <WebsiteFooter />
    </div>
  );
};

export default WebsiteLayout;
