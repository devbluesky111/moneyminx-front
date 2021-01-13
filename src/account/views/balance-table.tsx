import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/esm/Table';

import { gc } from 'common/interval-parser';
import { parseAmount } from 'common/common-helper';
import { getAccountDetailBalances } from 'api/request.api';
import { IBalanceData, IBalanceTable } from 'account/account.type';
import CircularSpinner from 'common/components/spinner/circular-spinner';

const BalanceTable: React.FC<IBalanceTable> = ({ accountId, currencySymbol }) => {
  const [balanceData, setBalanceData] = useState<IBalanceData>();

  useEffect(() => {
    (async () => {
      const { data, error } = await getAccountDetailBalances({ accountId });
      if (!error) {
        setBalanceData(data);
      }
    })();
  }, [accountId]);

  if (!balanceData) {
    return <CircularSpinner />;
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
