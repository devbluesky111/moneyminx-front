import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Account } from 'auth/auth.types';
import { getAccount } from 'api/request.api';
import { getRelativeDate } from 'common/moment.helper';
import { fNumber, numberWithCommas } from '../../../common/number.helper';
import AppSubHeader from '../../../common/app.sub-header';

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
        <AppSubHeader/>

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
