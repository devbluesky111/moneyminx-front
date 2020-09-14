import { Dictionary } from 'lodash';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { Account } from 'auth/auth.types';
import { AuthLayout } from 'layouts/auth.layout';
import { groupByProviderName } from 'auth/auth.helper';
import { getRefreshedProfile } from 'auth/auth.service';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { useAuthState, useAuthDispatch } from 'auth/auth.context';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { ReactComponent as SecurityIcon } from 'assets/images/signup/security.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';

import AccountSettingForm from './inc/account-setting-form';
import { ConnectAccountStepsSection } from './inc/connect-steps';

const AccountSetting = () => {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  useEffect(() => {
    if (!user) {
      const getUser = async () => {
        await getRefreshedProfile({ dispatch });
      };
      getUser();
    }
  }, [user, dispatch]);

  return (
    <AuthLayout>
      <AccountSettingMainSection />
    </AuthLayout>
  );
};
export default AccountSetting;
export const AccountSettingMainSection = () => {
  const { user } = useAuthState();
  const [providerName, setProviderName] = useState('');
  const [currentAccount, setCurrentAccount] = useState<Account>();
  const [currentProviderAccounts, setCurrentProviderAccounts] = useState<Account[]>();
  const [accountsByProviderName, setAccountsByProviderName] = useState<Dictionary<Account[]>>();

  useEffect(() => {
    if (user) {
      setCurrentAccount(user[0]);
      const accountsByProvider = groupByProviderName(user);
      setAccountsByProviderName(accountsByProvider);
      const [curProviderName] = Object.keys(accountsByProvider);
      setProviderName(curProviderName);
      const curProviderAccounts = accountsByProvider[curProviderName];
      setCurrentProviderAccounts(curProviderAccounts);
    }
  }, [user]);

  useEffect(() => {
    if (accountsByProviderName) {
      const curProviderAccounts = accountsByProviderName[providerName];
      setCurrentProviderAccounts(curProviderAccounts);
      setCurrentAccount(curProviderAccounts[0]);
    }
  }, [providerName, accountsByProviderName]);

  if (!user) {
    return <CircularSpinner />;
  }

  const providerNames = accountsByProviderName ? Object.keys(accountsByProviderName) : [''];
  const accountNames = currentProviderAccounts?.map((providerAcc) => providerAcc.accountName) || [''];

  const handleProviderChange = (provider: string) => {
    setProviderName(provider);
  };

  const handleAccountNameChange = (accountName: string) => {
    const curAccount = currentProviderAccounts?.find((provideAcc) => provideAcc.accountName === accountName);
    if (curAccount) {
      setCurrentAccount(curAccount);
    }
  };

  const getAccountClass = (accName: string) =>
    currentAccount?.accountName === accName ? 'account-btn active' : 'account-btn';

  return (
    <div className='main-table-wrapper'>
      <div className='mm-container mm-container-final'>
        <div className='row login-wrapper'>
          <div className='guide-content'>
            <div className='logo-img-wrap'>
              <LogoImg />
            </div>
            <h1>
              <span className='block'>Three easy steps to get </span>started with Money Minx
            </h1>
            <ul>
              <li>Find your accounts</li>
              <li>Connect it securely to Money Minx</li>
              <li>Let Money Minx to the rest</li>
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

          <div className='bg-white credintials-wrapper account-setting'>
            <div className='credintials-content'>
              <div className='logo-img-wrapper'>
                <LogoImg />
              </div>
              <div className='top-content-wrap'>
                <h2>Organize accounts</h2>
                <p>
                  Great! You connected your banks. Now you can organize your accounts to start getting insights into
                  your portfolio. You can leave this step for later.
                </p>
              </div>

              <div className='form-wrap'>
                <ul className='bank-list'>
                  {providerNames.map((provider, index) => {
                    return (
                      <li key={index} onClick={() => handleProviderChange(provider)} role='button'>
                        <Link to='#'>{provider}</Link>
                      </li>
                    );
                  })}
                </ul>

                <div className='form-heading'>
                  <ul className='nav'>
                    {accountNames.map((accountName, index) => {
                      return (
                        <li key={index}>
                          <button
                            className={getAccountClass(accountName)}
                            onClick={() => handleAccountNameChange(accountName)}
                          >
                            {accountName}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <AccountSettingForm currentAccount={currentAccount} />

                <p className='flex-box learn-more-security'>
                  <SecurityIcon />
                  <a href='/security'>Learn about our security</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConnectAccountStepsSection />
    </div>
  );
};
