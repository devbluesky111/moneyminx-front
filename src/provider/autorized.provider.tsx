import React, { createContext, useEffect, useState } from 'react';

import { Children } from 'common/common.types';
import LoadingScreen from 'common/loading-screen';

const AuthorizedStateContext = createContext<boolean>(false);

function AuthorizedProvider({ children }: Children) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthorized(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!authorized) {
    return <LoadingScreen />;
  }

  return <AuthorizedStateContext.Provider value={authorized}>{children}</AuthorizedStateContext.Provider>;
}

export default AuthorizedProvider;
