import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import WebsiteLayout from 'website/website.layout';
import BaseCurrency from 'assets/images/features/multicurrency.svg';
import SelectCurrency from 'assets/images/features/select-currency.svg';

const FeaturesMulticurrency = () => {
  return (
    <WebsiteLayout>
      <Helmet>
        <title>Multi Currency Portfolio | Money Minx</title>
      </Helmet>
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
          <div>
            <h1>Multi Currency</h1>
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
            <img src={BaseCurrency} alt={'Multi Currency Base Currency'} />
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
          <img src={SelectCurrency} alt={'Multi Currency Choose Currency'} />
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
