import React from 'react';
import WebsiteHeader from './inc/website.header';
import WebsiteFooter from './inc/website.footer';
import useScrollTop from 'common/hooks/useScrollTop';

interface WebsiteLayout {
  isSignupToday?: boolean;
}

const WebsiteLayout: React.FC<WebsiteLayout> = ({ children, isSignupToday }) => {
  useScrollTop();
  return (
    <div className='mm-overview-block'>
      <WebsiteHeader />
      <main className='main-content'>{children}</main>
      <WebsiteFooter isSignupToday={isSignupToday} />
    </div>
  );
};

export default WebsiteLayout;
