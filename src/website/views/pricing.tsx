import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import WebsiteLayout from 'website/website.layout';
import useGetSubscription from 'auth/hooks/useGetSubscription';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { ReactComponent as PricingTickIcon } from 'assets/images/pricing/tick-icon.svg';
import { ReactComponent as PricingPieChart } from 'assets/images/pricing/pricing-pie-chart.svg';

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

const pricingDetailConstant = {
  NAME: 'Name',
  CONNECTED_ACCOUNT: 'No of connected accounts',
  MANUAL_ACCOUNT: 'No of manual accounts',
  ALLOCATION_CHART_HISTORY: 'No of months in allocation charts history',
  USER: 'No of users(future)',
  PERFORMANCE: 'Performance(future)',
};

export const PricingTable = () => {
  const [type, setType] = useState<string>('monthly');

  const { fetchingSubscription, subError, subscription } = useGetSubscription();

  const btnClasses = 'mm-btn-animate plan-btn text-primary ml-3 btn-xs-block';

  const monthlyClasses = `${btnClasses} ${type === 'monthly' ? '' : 'annually'}`;
  const annualClasses = `${btnClasses} ${type === 'yearly' ? '' : 'annually'}`;

  if (fetchingSubscription && !subscription && subError) {
    return <CircularSpinner />;
  }

  const monthlyPricingList = subscription?.filter((sub: any) => sub.duration === 'month');
  const annualPricingList = subscription?.filter((sub: any) => sub.duration === 'year');

  const pricingList = type === 'monthly' ? monthlyPricingList : annualPricingList;

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
          {pricingList?.map((pt: any, index: number) => {
            return (
              <div className='price-table' key={index}>
                <div className='price-heading'>
                  <h2>{pt.name}</h2>
                  <p>{type === 'yearly' ? `$${pt.price}/Year` : `$${pt.price}/Month`}</p>
                  {type === 'yearly' ? <span className='save-percentage'>{'Save $89'}</span> : null}
                </div>
                <ul className='features-list'>
                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    {pt.details[pricingDetailConstant.CONNECTED_ACCOUNT]} connected accounts
                  </li>
                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    {pt.details[pricingDetailConstant.MANUAL_ACCOUNT]} manual accounts
                  </li>
                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    Current and{' '}
                    {pt.details[pricingDetailConstant.ALLOCATION_CHART_HISTORY] === 'Unlimited'
                      ? 'historical'
                      : `last ${pt.details[pricingDetailConstant.ALLOCATION_CHART_HISTORY]} months`}{' '}
                    asset allocation charts
                  </li>
                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    Early Adopter badge
                  </li>
                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    {pt.details[pricingDetailConstant.NAME]} badge
                  </li>
                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    New features as being developed
                  </li>
                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    Early adopter access to founders
                  </li>
                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    Early adopter access to request new features for consideration
                  </li>
                </ul>
                <Link to={`/auth/signup?priceId=${pt.priceId}`}>
                  <button className='mm-btn-animate trial-btn bg-white text-primary ml-3 btn-xs-block'>
                    Start 30 day trial
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
