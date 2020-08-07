import React from 'react';
import WebsiteLayout from 'website/website.layout';

import { ReactComponent as SecurityChart } from 'assets/images/security/chart.svg';

const Security = () => {
  return (
    <WebsiteLayout>
      <SecurityTopSection />
    </WebsiteLayout>
  );
};

export default Security;

export const SecurityTopSection = () => {
  return (
    <div className='mm-container-right'>
      <div className='row security-top'>
        <div className='col-lg-6'>
          <h1>Security and Privacy are always Top Priority</h1>
          <p className='text'>
            We know your finances are personal, private and confidential. That is why, at Money Minx the security of
            your account is a top priority and the privacy of the information you share with us is always kept secured.
          </p>
          <p className='text'>We never sell your data.</p>
          <p className='text'>
            We charge a subscription to use our service which is how we make money. We don’t make money by selling data.
            We sometimes have to share your data with third parties to help us deliver our services and we make sure
            they don’t sell your data either.
          </p>
        </div>
        <div className='col-lg-6 text-right security-chart-wrapper'>
          <SecurityChart />
        </div>
      </div>
    </div>
  );
};

export const SecurityHeroSection = () => {
  return <div />;
};
