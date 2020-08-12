import React from 'react';
import AuthFooter from 'auth/views/auth.footer';

export const AuthLayout: React.FC = ({ children }) => {
  return (
    <>
      {children}
      <AuthFooter />
    </>
  );
};
