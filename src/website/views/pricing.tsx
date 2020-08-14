import React, { useState } from 'react';
import WebsiteLayout from 'website/website.layout';
import { ReactComponent as PricingTickIcon } from 'assets/images/pricing/tick-icon.svg';
import { ReactComponent as PricingPieChart } from 'assets/images/pricing/pricing-pie-chart.svg';

import pricingList from '@mm/data/pricing-list.json';

const pricingData = pricingList.data;

const Pricing = () => {
  return (
    <WebsiteLayout>
      <PricingTopSection />
      <PricingTable />
    </WebsiteLayout>
  );
};
export default Pricing;
export const PricingTopSection = () => {
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
  const [type, setType] = useState<string>('monthly');

  const btnClasses = 'mm-btn-animate plan-btn text-primary ml-3 btn-xs-block';

  const monthlyClasses = `${btnClasses} ${type === 'monthly' ? '' : 'annually'}`;
  const annualClasses = `${btnClasses} ${type === 'yearly' ? '' : 'annually'}`;

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='plan-section'>
          <button className={monthlyClasses} onClick={() => setType('monthly')}>
            Monthly
          </button>
          <button className={annualClasses} onClick={() => setType('yearly')}>
            <span className='save-text'>Annually</span>
          </button>
        </div>
      </div>

      <div className='row'>
        <div className='pricing-table-wrapper'>
          {pricingData.map((pt, index) => {
            return (
              <div className='price-table' key={index}>
                <div className='price-heading'>
                  <h2>{pt.title}</h2>
                  <p>{type === 'yearly' ? pt.pricing.year : pt.pricing.month}</p>
                  {type === 'yearly' ? <span className='save-percentage'>{pt.pricing.yearlySave}</span> : null}
                </div>
                <ul className='features-list'>
                  {pt.features.map((f, i) => {
                    return (
                      <li key={i}>
                        <div className='tick-icon'>
                          <PricingTickIcon />
                        </div>
                        {f}
                      </li>
                    );
                  })}
                </ul>
                <button className='mm-btn-animate trial-btn bg-white text-primary ml-3 btn-xs-block'>
                  Start 30 day trial
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
