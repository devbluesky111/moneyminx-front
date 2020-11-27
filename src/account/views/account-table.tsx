import React, { useState } from 'react';

import { fNumber, numberWithCommas } from 'common/number.helper';
import { ReactComponent as Edited } from 'assets/images/account/Edited.svg';

export const AccountTable = (props: any) => {

  const [holdings, setHoldings] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);

  React.useEffect(() => {
    setHoldings(props?.data);
  }, [props.data]);

  const intervals = [];
  if (holdings?.length > 0) {
    for (let i = 0; i < 8; i++) {
      intervals.push(holdings[0].intervalValues[i].interval);
    }
  }

  return (
    <section>
      <div className='mm-account-table'>
        <div className='mm-account-table__overview'>
          <div className='mm-account-table__head'>
            {holdings?.length > 0 &&
              <div className="row no-gutters">
                <div className='col-md mm-account-table__head--data d-md-block' style={{ minWidth: '200px' }}>Holdings</div>
                <div className='col-md mm-account-table__head--data d-md-block'>Price</div>
                <div className='col-md mm-account-table__head--data d-xl-block'>Quantity</div>
                <div className='col-md mm-account-table__head--data d-xl-block'>Symbol</div>
                <div className='col-md mm-account-table__head--data d-xl-block'>Cost</div>
                {intervals?.length > 0 && intervals.map((item, index) => (
                  index === 4 ?
                    (<div className='col-md mm-account-table__head--data d-xl-block text-green' key={index}>{item}</div>)
                    :
                    (
                      <div className='col-md mm-account-table__head--data d-xl-block' key={index}>{item}</div>
                    )
                ))}
              </div>
            }
          </div>
          <div className='mm-account-table__body'>
            {holdings?.length > 0 && holdings.map((item, index) => (
              <div key={index}>
                <div className='d-md-none mm-account-table__body--sm-title mt-3'>Position 01</div>
                <div className='row no-gutters mm-account-table__body--wrapper' onMouseEnter={() => { setEditIndex(index) }} onMouseLeave={() => { setEditIndex(-1) }}>
                  <div className='col-4 col-md mm-account-table__body--data d-none d-md-block' style={{ minWidth: '200px' }}>{item.description}</div>
                  <div className='col-4 col-md mm-account-table__body--data order-1 order-md-0'><span className='d-block d-md-none'>Price</span> ${numberWithCommas(fNumber(item.price, 0))}</div>
                  <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>{item.quantity}</div>
                  <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>{item.symbol}</div>
                  <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>${numberWithCommas(fNumber(item.quantity * item.price, 0))}</div>
                  <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>${item.intervalValues[0].value}</div>
                  <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>{item.intervalValues[1].interval}</span>${item.intervalValues[1].value}</div>
                  <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>{item.intervalValues[2].interval}</span>${item.intervalValues[2].value}</div>
                  <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>{item.intervalValues[3].interval}</span>${item.intervalValues[3].value}</div>
                  <div className='col-4 col-md mm-account-table__body--data green-text'><span className='d-block d-md-none'>{item.intervalValues[4].interval}</span>${item.intervalValues[4].value}</div>
                  <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'><span className='d-block d-md-none'>{item.intervalValues[5].interval}</span>${item.intervalValues[5].value}</div>
                  <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>{item.intervalValues[6].interval}</span>${item.intervalValues[6].value}</div>
                  <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>{item.intervalValues[7].interval}</span>${item.intervalValues[7].value}</div>
                  {editIndex === index ? <Edited className='edited-icon mt-2' /> : <></>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section >
  );
};

export default AccountTable;
