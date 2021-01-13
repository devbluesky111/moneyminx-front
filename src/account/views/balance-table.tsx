import React from 'react';
import Table from 'react-bootstrap/esm/Table';

import { parseAmount } from 'common/common-helper';
import balances from '__mocks__/balances.mock.json';

const BalanceTable = () => {
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
                      <th key={index}>{balance.interval}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    {balances.map((balanceObj, index) => (
                      <td key={index}>{parseAmount(balanceObj.balance)}</td>
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
