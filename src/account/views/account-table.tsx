import { set } from 'lodash';
import React, { useState } from 'react';

import { fNumber, numberWithCommas } from 'common/number.helper';

export const AccountTable = (props: any) => {

  const [holdings, setHoldings] = useState<any[]>([]);

  React.useEffect(() => {
    console.log('passed holdings: ', props.data);
    setHoldings(props?.data?.holdings)
  }, [props.data]);

  return (
    <section>
      <div className='mm-account-table'>
        <div className='mm-account-table__overview'>
          <div className='mm-account-table__head'>
            <div className="row no-gutters">
              <div className='col-md mm-account-table__head--data d-md-block'>Holdings</div>
              <div className='col-md mm-account-table__head--data d-md-block'>Price</div>
              <div className='col-md mm-account-table__head--data d-xl-block'>Quantity</div>
              <div className='col-md mm-account-table__head--data d-xl-block'>Symbol</div>
              <div className='col-md mm-account-table__head--data d-xl-block'>Cost</div>
              <div className='col-md mm-account-table__head--data d-xl-block'>Mar 2020</div>
              <div className='col-md mm-account-table__head--data d-md-block'>Apr 2020</div>
              <div className='col-md mm-account-table__head--data d-md-block'>May 2020</div>
              <div className='col-md mm-account-table__head--data d-md-block text-green'>June 2020</div>
              <div className='col-md mm-account-table__head--data d-md-block'>Jul 2020</div>
              <div className='col-md mm-account-table__head--data d-xl-block'>Aug 2020</div>
              <div className='col-md mm-account-table__head--data d-md-block'>Sep 2020</div>
            </div>
          </div>
          <div className='mm-account-table__body'>
            <div className='d-md-none mm-account-table__body--sm-title mt-3'>Position 01</div>
            {holdings?.length > 0 && holdings.map((item, index) => (
              <div className='row no-gutters mm-account-table__body--wrapper' key={index}>
                <div className='col-4 col-md mm-account-table__body--data d-none d-md-block'>{item.description}</div>
                <div className='col-4 col-md mm-account-table__body--data order-1 order-md-0'><span className='d-block d-md-none'>Type</span> ${item.price}</div>
                <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>{item.quantity}</div>
                <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>{item.symbol}</div>
                <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>${numberWithCommas(fNumber(item.quantity * item.price, 0))}</div>
                <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>$78,000</div>
                <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>Apr 2020</span>$83,000</div>
                <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>May 2020</span>$88,000</div>
                <div className='col-4 col-md mm-account-table__body--data text-green'><span className='d-block d-md-none'>June 2020</span>$83,000</div>
                <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>Jul 2020</span>$94,000</div>
                <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'><span className='d-block d-md-none'>Aug 2020</span>$32,000</div>
                <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>Sep 2020</span>$32,000</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountTable;
