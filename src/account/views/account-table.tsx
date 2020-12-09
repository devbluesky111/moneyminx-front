import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

import { fNumber, numberWithCommas } from 'common/number.helper';
import { gc } from 'common/interval-parser';
import { getHoldingsDetails } from 'api/request.api';
import { ReactComponent as Edited } from 'assets/images/account/Edited.svg';
import { useModal } from 'common/components/modal';

import HoldingsDetailsModal from './holdings-details.modal';
import { AccountHolingsTableProps, AccountHoldingItem } from '../account.type';

export const AccountTable: React.FC<AccountHolingsTableProps> = ({ holdingsData, openEditPositionModalFun, closeEditPositionModalFun, currencySymbol }) => {

  const [holdings, setHoldings] = useState<AccountHoldingItem[]>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [holdingsDetails, setHoldingsDetails] = useState<any>();

  const holdingsDetailsModal = useModal();

  React.useEffect(() => {
    setHoldings(holdingsData);
  }, [holdingsData]);

  const fetchHolingsDetails = async (positionId: string) => {
    const { data, error } = await getHoldingsDetails(positionId);
    if (!error) {
      console.log('fetchHolingsDetails: ', data);

      setHoldingsDetails(data);
    }
  };

  const openEditPositionModal = async (positionId: number) => {
    await fetchHolingsDetails(positionId.toString());
    holdingsDetailsModal.open();
    openEditPositionModalFun();
  }

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
                      <tr key={index} onMouseEnter={() => { setEditIndex(index) }} onMouseLeave={() => { setEditIndex(-1) }} onClick={() => openEditPositionModal(item.id)} >
                        <td>{item.description}</td>
                        <td className='hide-type'>{item.price ? currencySymbol : ''}{item.price}</td>
                        <td >{item.quantity}</td>
                        <td className='hide-type'>{item.symbol}</td>
                        <td className='hide-type'>{item.costBasis ? currencySymbol : ''}{item.costBasis ? numberWithCommas(fNumber(item.costBasis, 2)) : 0}</td>
                        {item.intervalValues.map((ins: any, i: number) => (
                          <td key={i} className={[ins.type === `projection` && `projection`, gc(ins.interval)].join(' ')}>
                            <span className={gc(ins.interval)}>{ins.interval}</span>{ins.value ? currencySymbol : ''}{numberWithCommas(fNumber(ins.value, 2))}
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
      {holdingsDetails && <HoldingsDetailsModal holdingsDetailsModal={holdingsDetailsModal} holdingsDetails={holdingsDetails} closeEditPositionModal={closeEditPositionModalFun} />}
    </section >
  );
};

export default AccountTable;
