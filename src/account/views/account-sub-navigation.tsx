import React from 'react';
import { ReactComponent as Chase } from '../../assets/images/account/chase.svg';
import { ReactComponent as DownloadExcel } from '../../assets/images/allocation/download-excel.svg';
import AppSubHeader from '../../common/app.sub-header';

export const AccountSubNavigation = () => {
return (
<section>
  <div
    className='d-flex flex-wrap justify-content-md-between justify-content-around mm-account-sub-nav'>
    <AppSubHeader/>
    <div className='order-3 order-md-2'>
      <Chase />
    </div>
    <div className='order-2 order-md-3'>
      <DownloadExcel />
      <span className='ml-2 text-gray'>
        Download CSV
      </span>
    </div>
  </div>
</section>
);
};

export default AccountSubNavigation;
