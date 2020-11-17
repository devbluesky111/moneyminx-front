import React  from 'react';

import SubscriptionPlans from 'subscription/subscription.plans'
import {ReactComponent as SubscriptionWarning} from 'assets/images/subscription/warning.svg';

const Subscription = ({subscriptionEnded = true}) => {
  return (
    <div className='sub-ended-wrapper'>
      {subscriptionEnded && <PricingTopSection />}
      <SubscriptionPlans />
    </div>
  );
};
export default Subscription;
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

