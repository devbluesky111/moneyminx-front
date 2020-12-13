import React from 'react';
import { Link } from 'react-router-dom';

import WebsiteLayout from 'website/website.layout';
import TransactionHistoryFraud from 'assets/images/features/catch-fraud.svg';
import AccountHoldings from 'assets/images/features/account-holdings.svg';

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
            <img src={TransactionHistoryFraud} alt={'Transaction history to catch fraud'} />
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
          <img src={AccountHoldings} alt={'All account holdings in one place'} />
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
