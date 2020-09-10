import React from 'react';
import { Link } from 'react-router-dom';

const NetworthHead = () => {
  return (
    <div className='content-head'>
      <div className='container'>
        <div className='left-box'>
          <button className='plus-btn'>+</button>
          <div className='myaccount-drop'>
            <button
              type='button'
              className='dropdown-toggle'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              My Accounts
            </button>
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
            <i className='icon-download' />
            <span>Download</span> CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworthHead;
