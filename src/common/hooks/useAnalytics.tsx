import { useEffect } from 'react';
import ReactGA from 'react-ga';

import history from 'app/app.history';

const useAnalytics = () => {
  useEffect(() => {
    history.listen((location) => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    });
  }, []);
};

export default useAnalytics;
