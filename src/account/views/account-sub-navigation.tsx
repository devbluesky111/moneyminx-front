import React from 'react';
import { Image } from 'react-bootstrap';

import AppSubHeader from '../../common/app.sub-header';
import { AccountSubNavigationProps } from '../account.type';

export const AccountSubNavigation: React.FC<AccountSubNavigationProps> = (props) => {
  const { providerLogo, providerName } = props;

  return (
    <section>
      <div className='content-container mm-account-sub-nav'>
        <div className='app-subheader-container px-4 account'>
          <AppSubHeader />
          <div className='middle-box'>
            {providerLogo ?
              <Image src={providerLogo} className='providerLogo' />
              : <span>{providerName ? providerName : ''}</span>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountSubNavigation;
