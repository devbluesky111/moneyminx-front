import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { Account } from 'auth/auth.types';
import { appRouteConstants } from 'app/app-route.constant';
import { getAccount, getCurrentSubscription, getSubscription } from 'api/request.api';

import UpgradeAccountModal from './upgrade-account.modal';
import { fNumber, numberWithCommas } from './number.helper';
import { getRelativeDate } from './moment.helper';
import { pricingDetailConstant } from './common.constant';
import { useModal } from './components/modal';

const AppSubHeader = () => {
  const history = useHistory();
  const [currentAccount, setCurrentAccount] = useState<Account[]>();
  const [availableNumber, setAvailableNumber] = useState<number>(0);
  const [manualMax, setManualMax] = useState<boolean>(false);

  const upgradeAccountModal = useModal();

  const fetchCurrentAccount = async () => {
    const { data, error } = await getAccount();
    if (!error) {
      setCurrentAccount(data);
    }
  };

  useEffect(() => {
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
      console.log(autoLimit, manualLimit)
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
            <div className='dropdown-head'>
              <h4>Accounts</h4>
            </div>
            <div className='dropdown-box'>
              <ul className='success'>
                {currentAccount?.map((account, index) => {
                  return (
                    <li key={index}>
                      <Link to='#'>
                        <div>
                          <h5>{account.accountName}</h5>
                          <span>{getRelativeDate(account.balancesFetchedAt)}</span>
                        </div>
                        <div>${numberWithCommas(fNumber(account.balance, 2))}</div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {(availableNumber || manualMax) && <UpgradeAccountModal upgradeAccountModal={upgradeAccountModal} availableNumber={availableNumber} manualMax={manualMax} />}
    </div>
  );
};

export default AppSubHeader;
