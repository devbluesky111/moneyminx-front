import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

import { fNumber, numberWithCommas } from 'common/number.helper';
import { getCurrencySymbol } from 'common/currency-helper';
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
        <div className='row mb-40'>
          <div className='col-12'>
            <div className='ct-box'>
              <div className='table-holder'>
                <Table className='tb-responsive account' id='table-account-xls'>
                  <thead>
                    <tr>
                      <th className='s-hide'>Holdings</th>
                      <th className='hide-type'>Price</th>
                      <th>Quantity</th>
                      <th className='hide-type'>Symbol</th>
                      <th className='hide-type'>Cost</th>
                      {holdings?.[0]?.intervalValues.map((item: any, idx: number) => (
                        <th key={idx} className={gc(item.interval)}>
                          {item.interval}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {holdings?.length > 0 && holdings.map((item, index) => (
                      <tr key={index} onMouseEnter={() => { setEditIndex(index) }} onMouseLeave={() => { setEditIndex(-1) }}>
                        <td>{item.description}</td>
                        <td className='hide-type'>{item.price ? getCurrencySymbol(item.costBasisCurrency) : ''}{item.price}</td>
                        <td >{item.quantity}</td>
                        <td className='hide-type'>{item.symbol}</td>
                        <td className='hide-type'>{item.costBasis ? getCurrencySymbol(item.costBasisCurrency) : ''}{item.costBasis ? numberWithCommas(fNumber(item.costBasis, 2)) : 0}</td>
                        {item.intervalValues.map((ins: any, i: number) => (
                          <td key={i} className={[ins.type === `projection` && `projection`, gc(ins.interval)].join(' ')}>
                            <span className={gc(ins.interval)}>{ins.interval}</span>{ins.value ? getCurrencySymbol(item.costBasisCurrency) : ''}{numberWithCommas(fNumber(ins.value, 2))}
                            {(editIndex === index && i === (item.intervalValues.length - 1)) ? <Edited className='edited-icon' /> : <></>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      ) : (<span className='no-data'>No holdings data</span>)}
    </section >
  );
};

export default AccountTable;
