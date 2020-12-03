import React, { useState } from 'react';

import { fNumber, numberWithCommas } from 'common/number.helper';

import { AccountTransactionTableProps, AccountTransactionItem } from '../account.type';
import { ReactComponent as Info } from '../../assets/icons/info.svg';
import { ReactComponent as Revert } from '../../assets/icons/revert.svg';
import { ReactComponent as Edited } from '../../assets/icons/icon-edit.svg';


export const ActivityTable: React.FC<AccountTransactionTableProps> = (props) => {

  const [transactions, setTransactions] = useState<AccountTransactionItem[]>([]);

  React.useEffect(() => {
    setTransactions(props?.transactions);
  }, [props]);

  return (
    <section>
      {transactions?.length > 0 ? (
        <div className='mm-activity-table'>
          <div className='mm-activity-table__overview'>
            <div className='mm-activity-table__head'>
              <div className="row no-gutters">
                <div className='col-md mm-activity-table__head--data d-md-block'>Date</div>
                <div className='col-md mm-activity-table__head--data d-md-block'>Activity Type</div>
                <div className='col-md mm-activity-table__head--data d-xl-block'>Description </div>
                <div className='col-md mm-activity-table__head--data d-md-block'>Amount</div>
                <div className='col-md mm-activity-table__head--data d-md-block'>Balance</div>
                <div className='col-md mm-activity-table__head--data d-md-block'>Income</div>
                <div className='col-md mm-activity-table__head--data d-md-block'>Cash Flow</div>
                <div className='col-md-1 mm-activity-table__head--data d-md-block'><Info /></div>
              </div>
            </div>
            <div className='mm-activity-table__body'>
              {transactions.map((item, index) => (
                <div className='row no-gutters mm-activity-table__body--wrapper' key={index}>
                  <div className='col-4 col-md mm-activity-table__body--data'> <span className='d-block d-md-none'>Date</span>{item.date}</div>
                  <div className='col-4 col-md mm-activity-table__body--data'> <span className='d-block d-md-none'>Activity Type</span>{item.type}</div>
                  <div className='col-4 col-md mm-activity-table__body--data d-none d-xl-block'>{item.description}</div>
                  <div className='col-4 col-md mm-activity-table__body--data'> <span className='d-block d-md-none'>Amount</span>{(item.amount) ? `$${numberWithCommas(fNumber(item.amount, 0))}` : 0}</div>
                  <div className='col-4 col-md mm-activity-table__body--data'> <span className='d-block d-md-none'>Balance</span>{(item.balance) ? `$${numberWithCommas(fNumber(item.balance, 0))}` : 0}</div>
                  <div className='col-4 col-md mm-activity-table__body--data'> <span className='d-block d-md-none'>Income</span>{item.income ? 'Yes' : 'No'}</div>
                  <div className='col-4 col-md mm-activity-table__body--data'> <span className='d-block d-md-none'>Cash Flow</span>{item.cashFlow ? 'Yes' : 'No'}</div>
                  <div className='col-4 col-md-1 mm-activity-table__body--data'><Edited className='mr-3 mm-activity-table__body--data-edited d-none d-xl-inline' /><Revert /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (<span className='no-data'>No transaction data</span>)}
    </section>
  );
};

export default ActivityTable;
