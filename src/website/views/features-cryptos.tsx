import React from 'react';
import { Link } from 'react-router-dom';

import WebsiteLayout from 'website/website.layout';
import CryptosImg from 'assets/images/home/investment-assets-cryptos.svg';
import SyncCryptoAccountsImg from 'assets/images/features/sync-crypto-accounts.svg';

const FeaturesCryptos = () => {
  return (
    <WebsiteLayout>
      <div className='mm-new-container'>
        <FeaturesCryptosTopSection />
        <FeaturesCryptosBottomSection />
      </div>
    </WebsiteLayout>
  );
};
export default FeaturesCryptos;

export const FeaturesCryptosTopSection = () => {
  return (
    <section>
      <div className='row mm-about-top-section'>
        <div className='col-12 col-xl-7'>
          <div>
            <h1>Crypto Portfolio Tracker
              <span className='badge badge-pill badge-primary mm-coming-soon'>Coming Soon!</span>
            </h1>
            <div className='p-b-10'>
              <p className='text'>
                A well diversified portfolio is not complete without a little bit of crypto currencies in it.
                In addition to supporting bank accounts, loans, credit cards, and other investments, Money Minx also supports
                tracking and managing your cryptocurrencies.
              </p>
              <p>Note: Cryptocurrency is currently being tested with a few select Beta users and will be made available to all accounts soon.
              If you are interested in being an early tester, <a href='mailto:hello@moneyminx.com?Subject=I%20Want%20Crypto'>send us a note</a>.</p>
            </div>
            <Link to='/signup'>
              <button className='mm-btn-animate mm-btn-primary'>Get Started</button>
            </Link>
            <p className='info-text'>No credit card needed.</p>
          </div>
        </div>
        <div className='col-12 col-xl-5'>
          <img src={CryptosImg} alt={'Add Cryptos'} />
        </div>
      </div>
    </section>
  );
};

export const FeaturesCryptosBottomSection = () => {
  return (
    <section className='feature-section feature-section-reversed'>
      <div className='row'>
        <div className='col-lg-7 feature-image'>
          <img src={SyncCryptoAccountsImg} alt='Sync Crypto Wallets' />
        </div>
        <div className='col-lg-5 feature-content'>
          <h2>Cryptocurrency Wallets</h2>
          <p className='text'>
            If you use one of the many popular crypto wallets like Coinbase, Gemini or Binance, you can keep your crypto currency balance
            up-to-date in Money Minx at all times.
          </p>
        </div>
      </div>
    </section>
  );
};
