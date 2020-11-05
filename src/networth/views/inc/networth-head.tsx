import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as DownloadExcel } from '../../../assets/images/allocation/download-excel.svg';

const NetworthHead = () => {
  // const toggleAccounts = () => {
  //   console.log("dddddddd");
  // };
  // const 
  return (
    <div className='content-head'>
      <div className='container'>
        <div className='left-box'>
          <button className='plus-btn'>+</button>
          <div className='myaccount-drop'>
            <Dropdown
            >
              <Dropdown.Toggle>My Accounts</Dropdown.Toggle>
              <Dropdown.Menu className='dropdown-menu'>
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
        </div>
      </div>
    </div>
  );
};

export default NetworthHead;
