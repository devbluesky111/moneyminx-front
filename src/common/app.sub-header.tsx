import React, { useEffect, useRef, useState } from 'react';
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
  const [availableNumber, setAvailableNumber] = useState<number>(0);
  const [successAccounts, setSuccessAccounts] = useState<Account[]>([]);
  const [warningAccounts, setWarningAccounts] = useState<Account[]>([]);
  const [errorAccounts, setErrorAccounts] = useState<Account[]>([]);
  const [manualMax, setManualMax] = useState<boolean>(false);
  const upgradeAccountModal = useModal();
  const dropdownToggle = useRef(null);

  useEffect(() => {
    const fetchCurrentAccount = async () => {
      const { data, error } = await getAccountWithProvider();
      if (!error) {
        const successAccounts = data.filter((acc: Account) => (acc.providerAccount.status === 'LOGIN_IN_PROGRESS' || acc.providerAccount.status === 'IN_PROGRESS' || acc.providerAccount.status === 'PARTIAL_SUCCESS' || acc.providerAccount.status === 'SUCCESS'));
        const warningAccounts = data.filter((acc: Account) => (acc.providerAccount.status === 'USER_INPUT_REQUIRED'));
        const errorAccounts = data.filter((acc: Account) => (acc.providerAccount.status === 'FAILED' || !acc.providerAccount.status));
        setSuccessAccounts(successAccounts);
        setWarningAccounts(warningAccounts);
        setErrorAccounts(errorAccounts);
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

  const clickElement = (dropdownToggle: any) => {
    dropdownToggle.current?.click();
  };

  return (
    <div className='left-box d-flex align-items-center float-lg-left'>
      <span className='plus-btn' onClick={checkAccountLimit}>+</span>
      <div className='myaccount-drop'>
        <Dropdown className='drop-box' >
          <Dropdown.Toggle className='dropdown-toggle my-accounts' ref={dropdownToggle}>My Accounts</Dropdown.Toggle>
          <Dropdown.Menu className='dropdown-menu'>
            {(errorAccounts.length > 0 || warningAccounts.length > 0) &&
              <div className='dropdown-head'>
                <h4>Needs Attention</h4>
              </div>}
            <div className='dropdown-box'>
              {errorAccounts.length > 0 &&
                <div>
                  <ul className='error'>
                    {errorAccounts.map((account: Account, index: number) => {
                      return (
                        <li key={index}>
                          <Link to={`/account-details/${account.id}`} onClick={() => clickElement(dropdownToggle)}>
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
                  <hr />
                </div>
              }
              {warningAccounts.length > 0 &&
                <div>
                  <ul className='warning'>
                    {warningAccounts.map((account: Account, index: number) => {
                      return (
                        <li key={index}>
                          <Link to={`/account-details/${account.id}`} onClick={() => clickElement(dropdownToggle)}>
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
                  <hr />
                </div>
              }
              {successAccounts.length > 0 &&
                <ul className='success'>
                  {successAccounts.map((account: Account, index: number) => {
                    return (
                      <li key={index}>
                        <Link to={`/account-details/${account.id}`} onClick={() => clickElement(dropdownToggle)}>
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
