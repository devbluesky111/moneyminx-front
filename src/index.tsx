import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';

import env from 'app/app.env';

import App from './app/app';
import * as serviceWorker from './serviceWorker';

ReactGA.initialize(
  [
    {
      trackingId: env.GOOGLE_ANALYTICS_TRACKING_ID,
      gaOptions: {
        siteSpeedSampleRate: 1,
      },
    },
    {
      trackingId: env.GOOGLE_ADS_TRACKING_ID,
      gaOptions: {
        siteSpeedSampleRate: 1,
      },
    },
  ],
  {
    debug: false,
  }
);

ReactGA.set({ page: window.location.pathname + window.location.search });
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
