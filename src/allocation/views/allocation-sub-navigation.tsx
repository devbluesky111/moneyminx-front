import React from 'react';

import { AllocationsFilter } from 'allocation/allocation.enum';
import { AllocationSubNavigationProps } from 'allocation/allocation.type';

import { ReactComponent as DownloadExcel } from '../../assets/images/allocation/download-excel.svg';
import { Link } from 'react-router-dom';

export const AllocationSubNavigation: React.FC<AllocationSubNavigationProps> = ({ onTypeChange, filter }) => {
  return (
    <section className='content-container mm-allocation-sub-navigation'>
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
        <div className='center-box mm-plan-radios mm-allocation-radios mm-allocation-sub-navigation__category'>
          <input
            type='radio'
            id='mm-allocation-type'
            value='type'
            name='mm-radio-time-interval'
            checked={filter === AllocationsFilter.TYPE}
            aria-checked={filter === AllocationsFilter.TYPE}
            onChange={() => onTypeChange(AllocationsFilter.TYPE)}
          />
          <label className='labels' htmlFor='mm-allocation-type'>
            Type
          </label>
          <input
            type='radio'
            id='mm-allocation-asset'
            value='annually'
            name='mm-radio-time-interval'
            checked={filter === AllocationsFilter.ASSET_CLASS}
            aria-checked={filter === AllocationsFilter.ASSET_CLASS}
            onChange={() => onTypeChange(AllocationsFilter.ASSET_CLASS)}
          />
          <label className='labels' htmlFor='mm-allocation-asset'>
            Asset Class
          </label>
          <input
            type='radio'
            id='mm-allocation-country'
            value='country'
            name='mm-radio-time-interval'
            checked={filter === AllocationsFilter.COUNTRY}
            aria-checked={filter === AllocationsFilter.COUNTRY}
            onChange={() => onTypeChange(AllocationsFilter.COUNTRY)}
          />
          <label className='labels' htmlFor='mm-allocation-country'>
            Country
          </label>
          <input
            type='radio'
            id='mm-allocation-risk'
            value='risk'
            name='mm-radio-time-interval'
            checked={filter === AllocationsFilter.RISK}
            aria-checked={filter === AllocationsFilter.RISK}
            onChange={() => onTypeChange(AllocationsFilter.RISK)}
          />
          <label className='labels' htmlFor='mm-allocation-risk'>
            Risk
          </label>
          <div className='mm-radio-bg' />
        </div>
        {/*<div className='right-box'>
          <button type='button' className='download-btn'>
            <DownloadExcel />
            <span className='sm-hide'>Download</span> <span>CSV</span>
          </button>
        </div>*/}
      </div>
      </div>
    </section>
  );
};

export default AllocationSubNavigation;
