import React from 'react';
import App from './app/app';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga';

ReactGA.initialize(
  [
    { trackingId: 'UA-167185772-1', },
    { trackingId: 'AW-609225226', }
  ],
  { debug: true }
);

ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
