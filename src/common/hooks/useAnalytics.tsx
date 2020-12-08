import { useEffect } from 'react';
import ReactGA, { EventArgs } from 'react-ga';

import history from 'app/app.history';
import { useAuthState } from 'auth/auth.context';

const useAnalytics = () => {
  const { user } = useAuthState();
  const userId = user?.id;

  useEffect(() => {
    history.listen((location) => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      ReactGA.set({ userId });
    }
  }, [userId]);

  return {
    set(obj: Record<string, any>) {
      ReactGA.set(obj);
    },
    event(obj: EventArgs) {
      ReactGA.event(obj);
    },
  };
};

export default useAnalytics;
