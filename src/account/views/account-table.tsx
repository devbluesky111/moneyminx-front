import React, { useState } from 'react';

import { fNumber, numberWithCommas } from 'common/number.helper';
import { ReactComponent as Edited } from 'assets/images/account/Edited.svg';

import { AccountHolingsTableProps, AccountHoldingItem } from '../account.type';
import { getMonthYear, getQuarter, getYear } from 'common/moment.helper';

export const AccountTable: React.FC<AccountHolingsTableProps> = (props) => {

  const [holdings, setHoldings] = useState<AccountHoldingItem[]>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);

  React.useEffect(() => {
    setHoldings(props.holdings);
  }, [props]);

  const isCurrent = (interval: string) =>
    getMonthYear() === interval || getYear() === interval || getQuarter() === interval;

  const gc = (interval: string) => {
    if (interval) {
      if (isCurrent(interval)) {
        return 'current-m';
      }
    }
    // return 'tab-hide';
    return '';
  };

  return (
    <section>
      {holdings?.length > 0 ? (
        <div className='mm-account-table'>
          <div className='mm-account-table__overview'>
            <div className='mm-account-table__head'>
              <div className="row no-gutters">
                <div className='col-md mm-account-table__head--data d-md-block'>Holdings</div>
                <div className='col-md mm-account-table__head--data d-xl-block'>Price</div>
                <div className='col-md mm-account-table__head--data d-md-block'>Quantity</div>
                <div className='col-md mm-account-table__head--data d-xl-block'>Symbol</div>
                <div className='col-md mm-account-table__head--data d-xl-block'>Cost</div>
                {holdings?.[0]?.intervalValues.map((item: any, idx: number) => (
                  <div key={idx} className={['col-md mm-account-table__head--data d-xl-block', gc(item.interval)].join(' ')}>
                    {item.interval}
                  </div>
                ))}
              </div>
            </div>
            <div className='mm-account-table__body'>
              {holdings.map((item, index) => (
                <div key={index}>
                  <div className='d-md-none mm-account-table__body--sm-title mt-3'>{item.description}</div>
                  <div className='row no-gutters mm-account-table__body--wrapper' onMouseEnter={() => { setEditIndex(index) }} onMouseLeave={() => { setEditIndex(-1) }}>
                    <div className='col-4 col-md mm-account-table__body--data d-none d-md-block' >{item.description}</div>
                    <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>{(item.price) ? `$${numberWithCommas(fNumber(item.price, 0))}` : 0}</div>
                    <div className='col-4 col-md mm-account-table__body--data'><span className='d-block d-md-none'>Quantity</span>{item.quantity}</div>
                    <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>{item.symbol}</div>
                    <div className='col-4 col-md mm-account-table__body--data d-none d-xl-block'>{(item.costBasis) ? `$${numberWithCommas(fNumber(item.costBasis, 2))}` : 0}</div>
                    {item.intervalValues.map((ins: any, i: number) => (
                      <div key={i} className={[ins.type === `projection` && `projection`, 'col-4 col-md mm-account-table__body--data d-none d-md-block', gc(ins.interval)].join(' ')}>
                        <span className={['d-block d-md-none', gc(ins.interval)].join(' ')}>{ins.interval}</span>${ numberWithCommas(fNumber(ins.value, 0))}
                      </div>
                    ))}
                    {editIndex === index ? <Edited className='edited-icon mt-2' /> : <></>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (<span className='no-data'>No holdings data</span>)}
    </section >
  );
};

export default AccountTable;
