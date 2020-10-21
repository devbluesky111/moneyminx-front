import { useEffect } from 'react';

import { useAuthDispatch, useAuthState } from 'auth/auth.context';
import { getRefreshedProfile } from 'auth/auth.service';

const useAccountRefresh = () => {
  const dispatch = useAuthDispatch();
  const { isAuthenticated } = useAuthState();

  useEffect(() => {
    if (isAuthenticated) {
      getRefreshedProfile({ dispatch });
    }
  }, [dispatch, isAuthenticated]);
};

export default useAccountRefresh;
