import React from 'react';
import {AccountOverview} from '../../setting/pages/account-overview';


const SubscriptionEnded = () => {
  return (
    <section>
      <div className='subscription-ended bottom py-5'>
        <div className='container'>
          <AccountOverview updateAccountsFlag={true}/>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionEnded;

