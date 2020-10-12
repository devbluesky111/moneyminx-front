import React from 'react';

import AuthFooter from 'auth/views/auth.footer';
import useScrollTop from 'common/hooks/useScrollTop';

export const AuthLayout: React.FC = ({ children }) => {
  useScrollTop();
  return (
    <div className='auth-wrapper'>
      {children}
      <AuthFooter />
    </div>
  );
};
