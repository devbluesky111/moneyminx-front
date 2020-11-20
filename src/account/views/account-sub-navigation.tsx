import React from 'react';
import { ReactComponent as Chase } from '../../assets/images/account/chase.svg';
import { ReactComponent as DownloadExcel } from '../../assets/images/allocation/download-excel.svg';
import AppSubHeader from '../../common/app.sub-header';

export const AccountSubNavigation = () => {
return (
<section>
  <div className='content-container mm-account-sub-nav'>
    <div className='content-head'>
      <div className='container'>
    <AppSubHeader/>
    <div className='order-3 order-md-2'>
      <Chase />
    </div>
  </div>
    </div>
  </div>

</section>
);
};

export default AccountSubNavigation;
