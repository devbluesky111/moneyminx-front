import React from 'react';
import { Link } from 'react-router-dom';

import WebsiteLayout from 'website/website.layout';
import PeerStreetLogo from 'assets/images/subscription/peerstreetlogo.png';
import { ReactComponent as AboutSwitchIcon } from 'assets/images/about/switch.svg';
import { ReactComponent as AboutNetWorthChart } from 'assets/images/about/networth.svg';
import { ReactComponent as AboutWealthFrontIcon } from 'assets/images/about/wealthfront.svg';


const FeaturesTransactionHistory = () => {
  return (
    <WebsiteLayout>
      <div className='mm-new-container'>
        <FeaturesTransactionHistoryTopSection />
        <FeaturesTransactionHistoryBottomSection />
      </div>
    </WebsiteLayout>
  );
};
export default FeaturesTransactionHistory;

export const FeaturesTransactionHistoryTopSection = () => {
  return (
    <section>
      <div className='row mm-about-top-section'>
        <div className='col-12 col-xl-7'>
          <div>
            <h1>Transaction History</h1>
            <div className='p-b-10'>
              <p className='text'>
                By adding all of your accounts to Money Minx, you will be able to quickly monitor all of your accounts in one place.
                This is a great way to catch and prevent fraudulent activities on your accounts. If you come across a transaction
                you do not recognize, contact your financial institution right away!
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

export const FeaturesTransactionHistoryBottomSection = () => {
  return (
    <section className='feature-section feature-section-reversed'>
      <div className='row'>
        <div className='col-lg-7 feature-image'>
          <AboutNetWorthChart className='mm-about-net-worth-chart' />
        </div>
        <div className='col-lg-5 feature-content'>
          <h2>Account Holdings</h2>
          <p>
            Never forgot what holdings each of your accounts hold and find duplicate holdings across your accounts. With Money Minx
            you can easily review all of your holdings.
          </p>
        </div>
      </div>
    </section>
  );
};
