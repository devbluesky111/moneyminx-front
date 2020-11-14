import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as DownloadExcel } from '../../../assets/images/allocation/download-excel.svg';
import { Account } from 'auth/auth.types';
import { getAccount } from 'api/request.api';
import { getRelativeDate } from 'common/moment.helper';
import { fNumber, numberWithCommas } from '../../../common/number.helper';

const NetworthHead = () => {  
  const [currentAccount, setCurrentAccount] = useState<Account[]>();
  useEffect(() => {
    const fetchCurrentAccount = async () => {
      const { data, error } = await getAccount();
      if (!error) {
        setCurrentAccount(data);
      }
    };
    fetchCurrentAccount();
  }, []);
  return (
    <div className='content-head'>
      <div className='container'>
        <div className='left-box'>
          <button className='plus-btn'>+</button>
          <div className='myaccount-drop'>
            <Dropdown className='drop-box' >
              <Dropdown.Toggle className='dropdown-toggle'>My Accounts</Dropdown.Toggle>
              <Dropdown.Menu className='dropdown-menu'>
                <div className='dropdown-head'>
                  <h4>Needs Attention</h4>
                </div>
                <div className='dropdown-box'>
                  <ul className='pending'>
                    {currentAccount?.map((account, index) => {
                      return (
                        <li>
                          <Link to='#'>
                            <div>
                              <h5>{account.accountName}</h5>
                              <span>{getRelativeDate(account.balancesFetchedAt)}</span>
                            </div>
                            <div>${numberWithCommas(fNumber(account.balance, 2))}</div>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/*<div className='right-box'>
          <button type='button' className='download-btn'>
            <DownloadExcel />
            <span className='sm-hide'>Download</span> <span>CSV</span>
          </button>
        </div>*/}
      </div>
    </div>
  );
};

export default NetworthHead;
