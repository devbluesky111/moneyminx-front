import { Dictionary } from 'lodash';
import { Link } from 'react-router-dom';
import React, { createRef, useCallback, useEffect, useState } from 'react';

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
  const { accounts } = useAuthState();
  const dispatch = useAuthDispatch();
  useEffect(() => {
    if (!accounts) {
      const getUser = async () => {
        await getRefreshedProfile({ dispatch });
      };
      getUser();
    }
  }, [accounts, dispatch]);

  return (
    <AuthLayout>
      <AccountSettingMainSection />
    </AuthLayout>
  );
};

export default AccountSetting;

export const AccountSettingMainSection = () => {
  const { accounts } = useAuthState();
  const [providerName, setProviderName] = useState('');
  const [currentAccount, setCurrentAccount] = useState<Account>();
  const [currentProviderAccounts, setCurrentProviderAccounts] = useState<Account[]>();
  const [accountsByProviderName, setAccountsByProviderName] = useState<Dictionary<Account[]>>();

  useEffect(() => {
    if (accounts) {
      setCurrentAccount(accounts[0]);
      const accountsByProvider = groupByProviderName(accounts);
      setAccountsByProviderName(accountsByProvider);
      const [curProviderName] = Object.keys(accountsByProvider);
      setProviderName(curProviderName);
      const curProviderAccounts = accountsByProvider[curProviderName];
      setCurrentProviderAccounts(curProviderAccounts);
    }
  }, [accounts]);

  useEffect(() => {
    if (accountsByProviderName) {
      const curProviderAccounts = accountsByProviderName[providerName];
      setCurrentProviderAccounts(curProviderAccounts);
      setCurrentAccount(curProviderAccounts[0]);
    }
  }, [providerName, accountsByProviderName]);

  if (!accounts || !currentAccount || !currentProviderAccounts) {
    return <CircularSpinner />;
  }

  const providerNames = accountsByProviderName ? Object.keys(accountsByProviderName) : [''];

  const handleProviderChange = (provider: string) => {
    setProviderName(provider);
  };

  const handleChangeCurrentAccount = (curAccount: Account) => {
    setCurrentAccount(curAccount);
  };

  // const gotoNextAccount = () => {};

  return (
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
                <LogoImg className='auth-logo'/>
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
                  <AccountNameList
                    currentProviderAccounts={currentProviderAccounts}
                    currentAccount={currentAccount}
                    changeCurrentAccount={handleChangeCurrentAccount}
                  />
                </div>

                <AccountSettingForm currentAccount={currentAccount} />

                <p className='flex-box learn-more-security mt-3'>
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

interface AccountNameListProps {
  currentProviderAccounts: Account[];
  currentAccount: Account;
  changeCurrentAccount: (curAccount: Account) => void;
}

export const AccountNameList: React.FC<AccountNameListProps> = ({
  currentAccount,
  changeCurrentAccount,
  currentProviderAccounts,
}) => {
  const refList: any = [];

  currentProviderAccounts.forEach((currentProviderAccount) => {
    refList[currentProviderAccount.id] = createRef();
  });

  const scrollToCategory = useCallback(
    (id: number) => {
      if (refList) {
        refList[id]?.current.scrollIntoView({ inline: 'center' });
      }
    },
    [refList]
  );

  useEffect(() => {
    scrollToCategory(currentAccount.id);
  }, [scrollToCategory, currentAccount]);

  const getAccountClass = (accId: number) => (currentAccount?.id === accId ? 'account-btn active' : 'account-btn');

  return (
    <ul className='nav'>
      {currentProviderAccounts?.map((providerAccount, index) => {
        return (
          <li key={index} ref={refList[providerAccount.id]}>
            <button
              className={getAccountClass(providerAccount.id)}
              onClick={() => changeCurrentAccount(providerAccount)}
            >
              {providerAccount.accountName}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
