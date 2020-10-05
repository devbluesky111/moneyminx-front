import React from 'react';
import { AccountProps } from '../account.type';
import AccountTable from './account-table';
import Button from 'react-bootstrap/Button';

const Account: React.FC<AccountProps> = () => {
  return (
    <div className='mm-account'>
      {/* <NavBarSection /> */}
      {/* <AllocationSubNavigation /> */}
      <Button variant="primary" className='w-100 mb-4'>Add Position</Button>
      <AccountTable />
      {/* <FooterSection /> */}
    </div>
  );
};

export default Account;
