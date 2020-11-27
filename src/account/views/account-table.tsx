import React, { useState } from 'react';

import { fNumber, numberWithCommas } from 'common/number.helper';
import { ReactComponent as Edited } from 'assets/images/account/Edited.svg';

export const AccountTable = (props: any) => {

  const [holdings, setHoldings] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);

  React.useEffect(() => {
    setHoldings(props?.data);
  }, [props.data]);

  return (
    <section>
      {holdings?.length > 0 ? (
        <div className='mm-account-table'>
          <div className='mm-account-table__overview'>
            <div className='mm-account-table__head'>
              <div className="row no-gutters">
                <div className='col-md mm-account-table__head--data d-md-block' style={{ minWidth: '200px' }}>Holdings</div>
                <div className='col-md mm-account-table__head--data d-xl-block'>Price</div>
                <div className='col-md mm-account-table__head--data d-md-block'>Quantity</div>
                <div className='col-md mm-account-table__head--data d-xl-block'>Symbol</div>
                <div className='col-md mm-account-table__head--data d-xl-block'>Cost</div>
                <div className='col-md mm-account-table__head--data d-xl-block'>{holdings[0].intervalValues[0].interval}</div>
                <div className='col-md mm-account-table__head--data d-xl-block'>{holdings[0].intervalValues[1].interval}</div>
                <div className='col-md mm-account-table__head--data d-md-block'>{holdings[0].intervalValues[2].interval}</div>
                <div className='col-md mm-account-table__head--data d-md-block'>{holdings[0].intervalValues[3].interval}</div>
                <div className='col-md mm-account-table__head--data d-md-block text-green'>{holdings[0].intervalValues[4].interval}</div>
                <div className='col-md mm-account-table__head--data d-md-block'>{holdings[0].intervalValues[5].interval}</div>
                <div className='col-md mm-account-table__head--data d-md-block'>{holdings[0].intervalValues[6].interval}</div>
                <div className='col-md mm-account-table__head--data d-xl-block'>{holdings[0].intervalValues[7].interval}</div>
              </div>
            </div>
            <div className='mm-account-table__body'>
              {holdings.map((item, index) => (
                <div key={index}>
                  <div className='d-md-none mm-account-table__body--sm-title mt-3'>{item.description}</div>
                  <div className='row no-gutters mm-account-table__body--wrapper' onMouseEnter={() => { setEditIndex(index) }} onMouseLeave={() => { setEditIndex(-1) }}>
                    <div className='col-4 col-md mm-account-table__body--data d-none d-md-block' style={{ minWidth: '200px' }}>{item.description}</div>
                    <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>{(item.price) ? `$${numberWithCommas(fNumber(item.price, 0))}` : 0}</div>
                    <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>Quantity</span>{item.quantity}</div>
                    <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>{item.symbol}</div>
                    <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>{(item.quantity * item.price) ? `$${numberWithCommas(fNumber(item.quantity * item.price, 0))}` : 0}</div>
                    <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>{(item.intervalValues[0].value) ? `$${numberWithCommas(fNumber(item.intervalValues[0].value, 0))}` : 0}</div>
                    <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'><span className='d-block d-md-none'>{item.intervalValues[1].interval}</span>{(item.intervalValues[1].value) ? `$${numberWithCommas(fNumber(item.intervalValues[1].value, 0))}` : 0}</div>
                    <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>{item.intervalValues[2].interval}</span>{(item.intervalValues[2].value) ? `$${numberWithCommas(fNumber(item.intervalValues[2].value, 0))}` : 0}</div>
                    <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>{item.intervalValues[3].interval}</span>{(item.intervalValues[3].value) ? `$${numberWithCommas(fNumber(item.intervalValues[3].value, 0))}` : 0}</div>
                    <div className='col-4 col-md mm-account-table__body--data green-text'><span className='d-block d-md-none'>{item.intervalValues[4].interval}</span>{(item.intervalValues[4].value) ? `$${numberWithCommas(fNumber(item.intervalValues[4].value, 0))}` : 0}</div>
                    <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>{item.intervalValues[5].interval}</span>{(item.intervalValues[5].value) ? `$${numberWithCommas(fNumber(item.intervalValues[5].value, 0))}` : 0}</div>
                    <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>{item.intervalValues[6].interval}</span>{(item.intervalValues[6].value) ? `$${numberWithCommas(fNumber(item.intervalValues[6].value, 0))}` : 0}</div>
                    <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'><span className='d-block d-md-none'>{item.intervalValues[7].interval}</span>{(item.intervalValues[7].value) ? `$${numberWithCommas(fNumber(item.intervalValues[7].value, 0))}` : 0}</div>
                    {editIndex === index ? <Edited className='edited-icon mt-2' /> : <></>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (<span className="no-data">No holdings data</span>)}
    </section >
  );
};

export default AccountTable;
