import React  from 'react';

import {PricingTable} from '../../website/views/pricing'
import {ReactComponent as SubscriptionWarning} from '../../assets/images/subscription/warning.svg';

const PricingDetails = ({subscriptionEnded = true}) => {
  return (
    <div className='sub-ended-wrapper'>
      {subscriptionEnded && <PricingTopSection />}
      <PricingTable />
    </div>
  );
};
export default PricingDetails;
export const PricingTopSection = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='subs-ended-msg-box'>
          <div className='subs-ended-left'>
            <h4>Uh oh. Your subscription ended!</h4>
            <p>To continue using Money Minx please choose from one of the plans below to continue.</p>
          </div>
          <span className='warning-icon'>
              <SubscriptionWarning />
            </span>
        </div>
      </div>
    </div>
  );
};

