import React from 'react';

import { AllocationsFilter } from 'allocation/allocation.enum';
import { AllocationSubNavigationProps } from 'allocation/allocation.type';

import { ReactComponent as DownloadExcel } from '../../assets/images/allocation/download-excel.svg';

export const AllocationSubNavigation: React.FC<AllocationSubNavigationProps> = ({ onTypeChange, filter }) => {
  return (
    <section className='mm-allocation-sub-navigation'>
      <div className='mm-allocation-sub-navigation__row'>
        <div className='d-xl-flex d-block'>
          <div className='d-block d-md-flex align-items-center mb-3'>
            <div className='d-flex align-items-center mb-2 mb-md-0 mr-md-4'>
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
              </div>
            </div>
            <span className='d-flex align-items-end mm-switch-block mb-4 mb-md-0 mm-allocation-sub-navigation__switch'>
              <input
                type='radio'
                name='profileEnabled'
                className='mm-switch-input'
                value='true'
                checked
                aria-checked={false}
              />
              <label className='mm-switch mt-md-0 mt-3' role='button' />
              <span className='ml-2'>Group by account</span>
            </span>
          </div>
          <div className='mm-plan-radios mm-allocation-radios mm-allocation-sub-navigation__category m-auto mt-2'>
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
          <div className='d-flex mm-allocation-sub-navigation__download align-items-center mt-md-2'>
            <DownloadExcel />
            <span className='ml-2'>Download CSV</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllocationSubNavigation;
