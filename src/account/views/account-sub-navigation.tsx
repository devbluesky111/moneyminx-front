import React from 'react';
import { Image } from 'react-bootstrap';

import useSettings from 'setting/hooks/useSettings';

import AppSubHeader from '../../common/app.sub-header';
import { AccountSubNavigationProps } from '../account.type';

export const AccountSubNavigation: React.FC<AccountSubNavigationProps> = (props) => {
  const { providerLogo, providerName, baseCurrency, toggleBaseCurrency } = props;
  const { data } = useSettings();

  return (
    <section>
      <div className='content-container mm-account-sub-nav'>
        <div className='app-subheader-container px-4 account align-items-center'>
          <AppSubHeader />
          <div className='middle-box'>
            {providerLogo ?
              <Image src={providerLogo} className='providerLogo' />
              : <span>{providerName ? providerName : ''}</span>
            }
          </div>
          <span className='mm-switch-block d-flex align-items-center'>
            <input
              value='true'
              name='baseCurrency'
              type='checkbox'
              aria-checked={baseCurrency}
              className='mm-switch-input'
              checked={baseCurrency}
            />
            <label
              className='mm-switch mt-md-0 mt-sm-3'
              onClick={toggleBaseCurrency}
              role='button'
            />
            <span className='ml-2 view-in-base-currency'>View in base currency ({data?.currency})</span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default AccountSubNavigation;
