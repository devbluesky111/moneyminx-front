import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import { Account } from 'auth/auth.types';
import { AuthLayout } from 'layouts/auth.layout';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as SecurityIcon } from 'assets/images/signup/security.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';

import ManualAccountForm from './inc/manual-account-form';

const ManualAccount = () => {
  const [currentAccount, setCurrentAccount] = useState<Account>();

  return (
    <AuthLayout>
      <div className='main-table-wrapper'>
        <div className=''>
          <div className='row login-wrapper'>
            <div className='guide-content'>
              <Link to='/'>
                <LogoImg className='icon auth-logo' />
              </Link>

              <div className='auth-left-content'>
                <h1>Three easy steps to get started with Money Minx</h1>
                <ul>
                  <li>Find your accounts</li>
                  <li>Connect it securely to Money Minx</li>
                  <li>Let Money Minx do the rest</li>
                </ul>
                <div className='guide-bottom'>
                  <h4>Serious about security</h4>
                  <div className='guide-icon-wrap'>
                    <span className='locked-icon'>
                      <LoginLockIcon />
                    </span>
                    <p>The security of your information is our top priority</p>
                  </div>
                  <h4>Trusted by investors</h4>
                  <div className='guide-icon-wrap'>
                    <span className='shield-icon'>
                      <LoginShieldIcon />
                    </span>
                    <p>Investors from all over the world are using Money Minx</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white credentials-wrapper account-setting'>
              <div className='credentials-content'>
                <div className='logo-img-wrapper'>
                  <LogoImg className='auth-logo' />
                </div>
                <div className='top-content-wrap'>
                  <h2>Manual accounts</h2>
                  <p>
                    Manual accounts are offline accounts that you manage. Once you add the account, you will ba able to manage the value, holdings and transactions for this account.
                  </p>
                </div>

                <div className='form-wrap'>
                  <ManualAccountForm
                    currentAccount={currentAccount}
                  />

                  <p className='flex-box learn-more-security'>
                    <SecurityIcon />
                    <a href='/security' target='_blank' className='purple-links'>
                      Learn about our security
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ManualAccount;