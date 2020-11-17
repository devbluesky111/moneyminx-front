import React, { useState } from 'react';
import { ReactComponent as PricingTickIcon } from '../assets/images/pricing/tick-icon.svg';
import { pricingDetailConstant } from './common.constant';
import { Link } from 'react-router-dom';
import useGetSubscription from '../auth/hooks/useGetSubscription';
import CircularSpinner from './components/spinner/circular-spinner';

const SubscriptionPlans = () => {

    const [type, setType] = useState<string>('monthly');

    const { fetchingSubscription, subError, subscription } = useGetSubscription();

    if (fetchingSubscription && !subscription && subError) {
      return <CircularSpinner />;
    }

    const monthlyPricingList = subscription?.filter((sub: any) => sub.duration === 'month' && sub.active === true);
    const annualPricingList = subscription?.filter((sub: any) => sub.duration === 'year' && sub.active === true);

    const pricingList = type === 'monthly' ? monthlyPricingList : annualPricingList;

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='plan-section'>
            <div className='mm-plan-radios'>
              <input type='radio' id='mm-plan-month' value='monthly' name='mm-radio-time-interval' checked={type==='monthly'} />
              <label className='labels' htmlFor='mm-plan-month' onClick={() => setType('monthly')}>Monthly</label>
              <input type='radio' id='mm-plan-year' value='annually'  name='mm-radio-time-interval' checked={type==='yearly'} />
              <label className='labels' htmlFor='mm-plan-year' onClick={() => setType('yearly')}>Annually</label>
              <span className='save-text' />
              <div className='mm-radio-bg'/>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='pricing-table-wrapper'>
            {pricingList?.map((pt: any, index: number) => {
              return (
                <div className='price-table' key={index}>
                  <div className='price-heading'>
                    <h2>{pt.name}</h2>
                    <p>
                      {type === 'yearly' ? `$${pt.price}/Year` : `$${pt.price}/Month`}
                      {type === 'yearly' ? <span className='save-percentage'>Save ${pt.save}</span> : null}
                    </p>
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
                      {'Current and '}
                      {pt.details[pricingDetailConstant.ALLOCATION_CHART_HISTORY] === 'Unlimited'
                        ? 'historical '
                        : `last ${pt.details[pricingDetailConstant.ALLOCATION_CHART_HISTORY]} months `}
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
                    <button className='mm-btn-animate trial-btn ml-3 btn-xs-block'>
                      Start 14 day trial
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

export default SubscriptionPlans;
