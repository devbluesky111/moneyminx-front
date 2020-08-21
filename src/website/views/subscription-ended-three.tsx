import React from 'react';
import WebsiteLayout from 'website/website.layout';
import { ReactComponent as PricingPieChart } from 'assets/images/pricing/pricing-pie-chart.svg';
import { ReactComponent as SubscriptionPositiveWarning } from 'assets/images/subscription/positive-warning.svg';
import { ReactComponent as BackIcon } from 'assets/images/subscription/back-btn.svg';

import { ReactComponent as AboutWealthFrontIcon } from 'assets/images/about/wealthfront.svg';

const SubscriptionEnded = () => {
  return (
    <WebsiteLayout>
      <SubscriptionEndedTopSection />
      <PricingTable />
    </WebsiteLayout>
  );
};

export default SubscriptionEnded;
export const SubscriptionEndedTopSection = () => {
  return (
    <div className='mm-container-right pricing-banner-container'>
      <div className='row pricing-top'>
        <div className='col-lg-5'>
          <div className='pricing-left-banner'>
            <h1>
              <span className='block'>Early adopter </span>pricing (25% off)
            </h1>
            <p className='text'>
              No credit card needed, sign up now and use Money <span className='block'>Minx free for 30 days.</span>
            </p>

            <button className='mm-btn-animate bg-primary mm-btn-primary-outline'>Get Started</button>
            <p className='info-text'>No credit card needed.</p>
          </div>
        </div>
        <div className='col-lg-7 pricing-chart-wrapper'>
          <div className='banner-piechart'>
            <PricingPieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PricingTable = () => {
  return (
    <div className='container-fluid subscription-ended bottom'>
      <div className='row'>
        <div className='subs-ended-msg-box positive'>
          <div className='subs-ended-left'>
            <h4>All set!</h4>
            <p>You are good to go, hit the Finish button to get back to your dashboard.</p>
          </div>
          <span className='warning-icon'>
            <SubscriptionPositiveWarning />
          </span>
        </div>
        <div className='col-lg-12'>
          <div className='subscription-account-wrap'>
            <h3>Connected Accounts</h3>
            <ul className='subscribed-list'>
              <li>
                <div className='account-wrap'>
                  <p>
                    <span className='logo-icon'>
                      <AboutWealthFrontIcon />
                    </span>
                    Wealthfront
                  </p>
                  <button className='delete-btn'>
                    <a href='link9'>Delete Account</a>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='subscription-bottom-text positive'>
          <div className='subs-content one'>
            <a href='link12'>
              <span className='back-btn'>
                <BackIcon />
              </span>
            </a>
          </div>
          <div className='subs-content two'>
            <p>1/1</p>
          </div>
          <div className='subs-content three'>
            <p>You are good to go!</p>
          </div>
          <div className='subs-content four'>
            <button className='finish-btn'>
              <a href='link11'>Finish</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
