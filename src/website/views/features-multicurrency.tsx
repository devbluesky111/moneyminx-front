import React from 'react';
import { Link } from 'react-router-dom';

import WebsiteLayout from 'website/website.layout';
import PeerStreetLogo from 'assets/images/subscription/peerstreetlogo.png';
import { ReactComponent as AboutSwitchIcon } from 'assets/images/about/switch.svg';
import { ReactComponent as AboutNetWorthChart } from 'assets/images/about/networth.svg';
import { ReactComponent as AboutWealthFrontIcon } from 'assets/images/about/wealthfront.svg';

const FeaturesMulticurrency = () => {
  return (
    <WebsiteLayout>
      <div className='mm-new-container'>
        <FeaturesMulticurrencyTopSection />
        <FeaturesMulticurrencyBottomSection />
      </div>
    </WebsiteLayout>
  );
};
export default FeaturesMulticurrency;

export const FeaturesMulticurrencyTopSection = () => {
  return (
    <section>
      <div className='row mm-about-top-section'>
        <div className='col-12 col-xl-7'>
          <div className=''>
            <h1>Multicurrency</h1>
            <div className='p-b-10'>
              <p className='text'>
                Money Minx is built for the international investor in mind.
                We support all of the major currencies and several less known currencies (see the full list below). When you set up
                a new investment account, you can assign a currency for that account as well as set up a base currency for your account as whole.
                All accounts will then be converted to your base account so you can easily compare. You can also use this feature for fun and see what
                your net worth value is in any of the supported currencies.
              </p>
            </div>
            <Link to='/signup'>
              <button className='mm-btn-animate mm-btn-primary'>Get Started</button>
            </Link>
            <p className='info-text'>No credit card needed.</p>
          </div>
        </div>
        <div className='col-12 col-xl-5'>
          <div className='mm-about-right-banner'>
            <div className='account-wrap bg-white top-box'>
              <h3>Connected Accounts</h3>
              <p>Go ahead, add more accounts</p>
            </div>

            <div className='account-wrap bg-white border'>
              <h4>
                <span className='logo-icon'>
                  <AboutWealthFrontIcon />
                </span>
                Wealthfront
              </h4>
              <ul className='account-list'>
                <li>
                  <span className='switch-icon'>
                    <AboutSwitchIcon />{' '}
                  </span>
                  Joint Cash Account
                </li>
                <li>
                  <span className='switch-icon'>
                    <AboutSwitchIcon />
                  </span>{' '}
                  Investment Account
                </li>
              </ul>
            </div>
            <div className='account-wrap bg-white border small-box'>
              <h4>
                <span className='logo-icon'>
                  <img alt='Peer Street' src={PeerStreetLogo} />
                </span>
                Peer Street
              </h4>
              <ul className='account-list'>
                <li>
                  <span className='switch-icon'>
                    <AboutSwitchIcon />{' '}
                  </span>
                  Individual Investor Account
                </li>
                <li>
                  <span className='switch-icon'>
                    <AboutSwitchIcon />
                  </span>{' '}
                  Self-directed IRA
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FeaturesMulticurrencyBottomSection = () => {
  return (
    <section className='feature-section feature-section-reversed'>
      <div className='row'>
        <div className='col-lg-7 feature-image'>
          <AboutNetWorthChart className='mm-about-net-worth-chart' />
        </div>
        <div className='col-lg-5 feature-content'>
          <h2>Supported Currencies</h2>
          <p>
            Here is a list of supported currencies: USD, EUR, GBP, CAD, JPY, AUD, CHF, INR, SGD, ILS, KRW, PHP, PLN, THB, BGN, CZK,
            DKK, HUF, RON, SEK, ISK, NOK, HRK, RUB, TRY, BRL, CNY, HKD, IDR, MXN, MYR, NZD, ZAR. If you use a different currency, let
            us know. We will gladly add support for it.
          </p>
        </div>
      </div>
    </section>
  );
};
