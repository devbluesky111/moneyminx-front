import React, { useState } from 'react';

import { ReactComponent as Info } from '../../assets/icons/info.svg';
import { ReactComponent as Revert } from '../../assets/icons/revert.svg';
import { ReactComponent as Edited } from '../../assets/icons/edited.svg';

export const ActivityTable = (props: any) => {

  const [transactions, setTransactions] = useState<any[]>([{}, {}, {}]);

  React.useEffect(() => {
    // setTransactions(props?.data?.transactions)
  }, [props.data]);

  return (
    <section>
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
            {transactions?.length > 0 && transactions.map((item, index) => (
              <div className='row no-gutters mm-activity-table__body--wrapper' key={index}>
                <div className='col-4 col-md mm-activity-table__body--data'> <span className='d-block d-md-none'>Date</span> 06 / 23 / 2020</div>
                <div className='col-4 col-md mm-activity-table__body--data'> <span className='d-block d-md-none'>Activity Type</span> Dividend </div>
                <div className='col-4 col-md mm-activity-table__body--data d-none d-xl-block'>This is a projection</div>
                <div className='col-4 col-md mm-activity-table__body--data'> <span className='d-block d-md-none'>Amount</span> $540</div>
                <div className='col-4 col-md mm-activity-table__body--data'> <span className='d-block d-md-none'>Balance</span> $234,233</div>
                <div className='col-4 col-md mm-activity-table__body--data'> <span className='d-block d-md-none'>Income</span>Yes</div>
                <div className='col-4 col-md mm-activity-table__body--data'> <span className='d-block d-md-none'>Cash Flow</span>Yes</div>
                <div className='col-4 col-md-1 mm-activity-table__body--data'><Edited className='mr-3 mm-activity-table__body--data-edited d-none d-xl-inline' /><Revert /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityTable;
