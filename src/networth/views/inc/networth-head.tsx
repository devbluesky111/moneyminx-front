import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as DownloadExcel } from '../../../assets/images/allocation/download-excel.svg';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Account } from 'auth/auth.types';
import { getAccount } from 'api/request.api';
import { getRelativeDate } from 'common/moment.helper';

const NetworthHead = () => {  
  const [currentAccount, setCurrentAccount] = useState<Account[]>();
  useEffect(() => {
    const fetchCurrentAccount = async () => {
      const { data, error } = await getAccount();
console.log("dddddddddddddddddddddddddddd");
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
                            <div>${account.balance}</div>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </Dropdown.Menu>
            </Dropdown>
            <div className='dropdown-menu'>
              <div className='dropdown-head'>
                <h4>Needs Attention</h4>
              </div>
              <div className='dropdown-box'>
                <ul className='pending'>
                  <li>
                    <Link to='/kkkk'>
                      <div>
                        <h5>Robinhood</h5>
                        <span>10 days ago</span>
                      </div>
                      <div>$2,343</div>
                    </Link>
                  </li>
                  <li>
                    <Link to='/abc'>
                      <div>
                        <h5>Yieldstreet</h5>
                        <span>12 days ago</span>
                      </div>
                      <div>$2,343</div>
                    </Link>
                  </li>
                </ul>
                <ul className='success'>
                  <li>
                    <Link to='/Robinhood'>
                      <div>
                        <h5>Robinhood</h5>
                        <span>10 days ago</span>
                      </div>
                      <div>$2,343</div>
                    </Link>
                  </li>
                  <li>
                    <Link to='/yieldstreet'>
                      <div>
                        <h5>Yieldstreet</h5>
                        <span>12 days ago</span>
                      </div>
                      <div>$2,343</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='right-box'>
          <button type='button' className='download-btn'>
            <DownloadExcel />
            <span className='sm-hide'>Download</span> <span>CSV</span>
          </button>
          {/* <ReactHTMLTableToExcel
            id='investment-table-xls-button'
            className='download-btn'
            table='table'
            filename='investment_assets_xls'
            sheet='tablexls'
            buttonText={
              <span><DownloadExcel />
              <span className='sm-hide'>Download</span> <span>CSV</span></span>
            }
          /> */}
        </div>
      </div>
    </div>
  );
};

export default NetworthHead;
