import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Account } from 'auth/auth.types';
import { appRouteConstants } from 'app/app-route.constant';
import { getAccount, getAccountWithProvider, getCurrentSubscription, getSubscription } from 'api/request.api';

import UpgradeAccountModal from './upgrade-account.modal';
import { fNumber, numberWithCommas } from './number.helper';
import { getRelativeDate } from './moment.helper';
import { pricingDetailConstant } from './common.constant';
import { useModal } from './components/modal';
import { getCurrencySymbol } from './currency-helper';

const AppSubHeader = () => {
  const history = useHistory();
  const [accountByProviderStatus, setAccountByProviderStatus] = useState<any>({});
  const [availableNumber, setAvailableNumber] = useState<number>(0);
  const [manualMax, setManualMax] = useState<boolean>(false);
  const upgradeAccountModal = useModal();

  useEffect(() => {
    const fetchCurrentAccount = async () => {
      const { data, error } = await getAccountWithProvider();
      if (!error) {
        const AccountByProviderStatus = data.reduce((acc: any, value: Account) => {
          if (!acc['success']) { acc['success'] = []; }
          if (!acc['warning']) { acc['warning'] = []; }
          if (!acc['danger']) { acc['danger'] = []; }
          const status = value.providerAccount.status;
          if (status === 'LOGIN_IN_PROGRESS' || status === 'IN_PROGRESS' || status === 'PARTIAL_SUCCESS' || status === 'SUCCESS') {
            acc['success'].push(value);
          } else if (status === 'USER_INPUT_REQUIRED') {
            acc['warning'].push(value);
          } else {
            acc['danger'].push(value);
          }

          return acc;
        }, {});
        setAccountByProviderStatus(AccountByProviderStatus);
      }
    };
    fetchCurrentAccount();
  }, []);

  const checkAccountLimit = async () => {
    const { data } = await getCurrentSubscription();
    if (data?.subscriptionStatus === 'active' || data?.subscriptionStatus === 'trialing') {
      const accounts = await getAccount();
      const manualAccounts = accounts?.data?.filter(
        (account: Record<string, string>) => account.isManual
      ).length;
      const autoAccounts = accounts?.data?.filter(
        (account: Record<string, string>) => !account.isManual
      ).length;
      const subscriptionDetails = await getSubscription({ priceId: data.priceId });
      let autoLimit = subscriptionDetails?.data?.details[pricingDetailConstant.CONNECTED_ACCOUNT];
      let manualLimit = subscriptionDetails?.data?.details[pricingDetailConstant.MANUAL_ACCOUNT];
      if (autoLimit === 'Unlimited') autoLimit = 100;
      if (manualLimit === 'Unlimited') manualLimit = 100;
      if (autoAccounts < autoLimit) {
        return history.push(appRouteConstants.auth.CONNECT_ACCOUNT);
      } else
        if (manualAccounts < manualLimit) {
          setAvailableNumber(autoLimit);
          return upgradeAccountModal.open();
        } else {
          setManualMax(true);
          return upgradeAccountModal.open();
        }
    } else return history.push(appRouteConstants.subscription.SUBSCRIPTION);
  }

  return (
    <div className='left-box d-flex align-items-center float-lg-left'>
      <span className='plus-btn' onClick={checkAccountLimit}>+</span>
      <div className='myaccount-drop'>
        <Dropdown className='drop-box' >
          <Dropdown.Toggle className='dropdown-toggle my-accounts'>My Accounts</Dropdown.Toggle>
          <Dropdown.Menu className='dropdown-menu'>
            {(accountByProviderStatus?.['danger']?.length > 0 || accountByProviderStatus?.['warning']?.length > 0) &&
              <div className='dropdown-head'>
                <h4>Needs Attension</h4>
              </div>}
            <div className='dropdown-box'>
              {accountByProviderStatus?.['danger']?.length > 0 &&
                <ul className='danger'>
                  {accountByProviderStatus['danger'].map((account: Account, index: number) => {
                    return (
                      <li key={index}>
                        <Link to='#'>
                          <div>
                            <h5>{account.accountName}</h5>
                            <span>{getRelativeDate(account.balancesFetchedAt)}</span>
                          </div>
                          <div>{getCurrencySymbol(account.currency)}{numberWithCommas(fNumber(account.balance, 2))}</div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              }
              {accountByProviderStatus?.['warning']?.length > 0 &&
                <ul className='warning'>
                  {accountByProviderStatus['warning'].map((account: Account, index: number) => {
                    return (
                      <li key={index}>
                        <Link to='#'>
                          <div>
                            <h5>{account.accountName}</h5>
                            <span>{getRelativeDate(account.balancesFetchedAt)}</span>
                          </div>
                          <div>{getCurrencySymbol(account.currency)}{numberWithCommas(fNumber(account.balance, 2))}</div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              }
              {accountByProviderStatus?.['success']?.length > 0 &&
                <ul className='success'>
                  {accountByProviderStatus['success'].map((account: Account, index: number) => {
                    return (
                      <li key={index}>
                        <Link to='#'>
                          <div>
                            <h5>{account.accountName}</h5>
                            <span>{getRelativeDate(account.balancesFetchedAt)}</span>
                          </div>
                          <div>{getCurrencySymbol(account.currency)}{numberWithCommas(fNumber(account.balance, 2))}</div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              }
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {(availableNumber || manualMax) && <UpgradeAccountModal upgradeAccountModal={upgradeAccountModal} availableNumber={availableNumber} manualMax={manualMax} />}
    </div>
  );
};

export default AppSubHeader;
