import React from 'react';
import { ReactComponent as Chase } from '../../assets/images/account/chase.svg';
import { ReactComponent as DownloadExcel } from '../../assets/images/allocation/download-excel.svg';

export const AccountSubNavigation = () => {
return (
<section>
  <div
    className='d-flex flex-wrap justify-content-md-between justify-content-around mm-account-sub-nav'>
    <div className='d-flex align-items-center mb-2 mb-md-0 mr-md-4'>
      <button className='plus-btn'>+</button>
      <div className='myaccount-drop'>
        <button type='button' className='dropdown-toggle' data-toggle='dropdown'
          aria-haspopup='true' aria-expanded='false'>
          My Accounts
        </button>
      </div>
    </div>
    <div className='order-3 order-md-2'>
      <Chase />
    </div>
    <div className='order-2 order-md-3'>
      <DownloadExcel />
      <span className='ml-2'>
        Download CSV
      </span>
    </div>
  </div>
</section>
);
};

export default AccountSubNavigation;
