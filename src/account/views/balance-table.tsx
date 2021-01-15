import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Table from 'react-bootstrap/esm/Table';

import { gc } from 'common/interval-parser';
import { parseAmount } from 'common/common-helper';
import { IBalanceTable } from 'account/account.type';

const BalanceTable: React.FC<IBalanceTable> = ({ balanceData, currencySymbol }) => {
  if (!balanceData) {
    return <Skeleton width={1232} height={250} />;
  }

  const balances = balanceData.balances;

  return (
    <section>
      <div className='row mb-40'>
        <div className='col-12'>
          <div className='ct-box'>
            <div className='table-holder'>
              <Table className='tb-responsive account' id='table-account-xls'>
                <thead>
                  <tr>
                    <th className='s-hide'>Description</th>
                    {balances.map((balance, index) => (
                      <th key={index} className={gc(balance.interval)}>
                        {balance.interval}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{balanceData.accountName}</td>
                    {balances.map((balanceObj, index) => (
                      <td key={index} className={gc(balanceObj.interval)}>
                        {parseAmount(balanceObj.balance, currencySymbol)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BalanceTable;
