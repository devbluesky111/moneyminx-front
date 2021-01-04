import { useEffect } from 'react';

import { fetchConnectionInfo } from 'auth/auth.service';
import { useAuthDispatch, useAuthState } from 'auth/auth.context';

const useConnectionInfo = () => {
  const dispatch = useAuthDispatch();
  const { isAuthenticated } = useAuthState();

  useEffect(() => {
    if (isAuthenticated) {
      fetchConnectionInfo({ dispatch });
    }
  }, [dispatch, isAuthenticated]);
};

export default useConnectionInfo;
