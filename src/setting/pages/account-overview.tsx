import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Account } from 'auth/auth.types';
import { groupByProviderName } from 'auth/auth.helper';
import { getRefreshedProfile } from 'auth/auth.service';
import { appRouteConstants } from 'app/app-route.constant';
import useGetSubscription from 'auth/hooks/useGetSubscription';
import { pricingDetailConstant } from 'common/common.constant';
import { useAuthDispatch, useAuthState } from 'auth/auth.context';
import { ReactComponent as Edited } from 'assets/icons/edited.svg';
import { ReactComponent as Refresh } from 'assets/icons/refresh.svg';
import useCurrentSubscription from 'auth/hooks/useCurrentSubscription';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { ReactComponent as PeerStreet } from 'assets/icons/peer-street.svg';
import { ReactComponent as WealthLogo } from 'assets/icons/wealth-logo.svg';
import { ReactComponent as DefaultProviderLogo} from 'assets/icons/mm-default-provider.svg';
import DefaultAvatar from 'assets/icons/default-avatar.svg';

import {
  AccountCardProps,
  AccountRowProps,
  ManualAccountProps,
  SettingPageEnum
} from 'setting/setting.type';
import { getRelativeDate } from '../../common/moment.helper';
import { fNumber, numberWithCommas } from '../../common/number.helper';

interface AccountOverviewProps {
  changeTab: (pageName: SettingPageEnum) => void;
}

export const AccountOverview: React.FC<AccountOverviewProps> = ({ changeTab }) => {
  const { accounts } = useAuthState();
  const dispatch = useAuthDispatch();
  const { fetchingCurrentSubscription, currentSubscription } = useCurrentSubscription();
  const { fetchingSubscription, subscription } = useGetSubscription(currentSubscription?.priceId);

  useEffect(() => {
    if (!accounts) {
      const getUser = async () => {
        await getRefreshedProfile({ dispatch });
      };
      getUser();
    }
  }, [accounts, dispatch]);

  const loading = fetchingCurrentSubscription || fetchingSubscription;

  if (loading || !accounts) {
    return <CircularSpinner />;
  }

  const manualAccounts = accounts.filter((acc) => acc.isManual);
  const connectedAccounts = accounts.filter((acc) => !acc.isManual);

  const numberOfConnectedAccounts = subscription?.details?.[pricingDetailConstant.CONNECTED_ACCOUNT] || 0;
  const numberOfManualAccounts = subscription?.details?.[pricingDetailConstant.CONNECTED_ACCOUNT] || 0;

  return (
    <section className='mm-account-overview'>
      <AccountCard accountList={connectedAccounts} availableAccounts={numberOfConnectedAccounts} changeTab={changeTab} />
      <ManualAccounts manualAccountList={manualAccounts} availableAccounts={numberOfManualAccounts} changeTab={changeTab} />
    </section>
  );
};

export const ManualAccounts: React.FC<ManualAccountProps> = ({ manualAccountList, availableAccounts, changeTab }) => {
  const history = useHistory();
  const needUpgrade = manualAccountList.length >= availableAccounts;

  const addAccount = () => {
    if (!needUpgrade) {
      history.push(appRouteConstants.auth.CONNECT_ACCOUNT);
    } else {
      changeTab(SettingPageEnum.PLAN);
    }
  }

  return (
    <>
      <div className='card mm-setting-card'>
        <div className='card-body'>
          <div className='d-md-flex flex-wrap justify-content-between align-items-center'>
            <div className='mm-account-overview__add-account m-b-8 mb-md-0'>
              <span>Manual Accounts ({manualAccountList.length}/{availableAccounts})</span>
              { needUpgrade &&
              <span className='upgrade-caption'>Upgrade your account to add more connections</span>
              }
            </div>
            <div>
              <button
                type='button'
                className='btn btn-outline-primary mm-button btn-lg'
                onClick={addAccount}
              >
                {needUpgrade ? 'Upgrade Plan' : 'Add Account' }
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='card mm-setting-card mm-account-overview__account'>
        <div className='card-body manual'>
          <div className='row pb-2 pt-1'>
            <div className='col-10 col-md-6'>
              <div>
                <DefaultProviderLogo className='mr-3 mr-md-4'/>
                <span className='mm-account-overview__block-title'>My own account</span>
              </div>
            </div>
          </div>

          {manualAccountList.map((acc, index) => {
            return <AccountRow account={acc} key={index} />;
          })}

          <div className='row py-3'>
            <div className='col-12 col-md-6' />
            <div className='col-12 col-md-6'>
              <div className='text-danger text-md-right mm-account-overview__delete-link'>
                Delete account and remove data
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AccountCard: React.FC<AccountCardProps> = ({ accountList, availableAccounts, changeTab }) => {
  const history = useHistory();
  const needUpgrade = accountList.length >= availableAccounts;
  const accountsByProvider = groupByProviderName(accountList);

  const addAccount = () => {
    if (!needUpgrade) {
      history.push(appRouteConstants.auth.CONNECT_ACCOUNT);
    } else {
      changeTab(SettingPageEnum.PLAN);
    }
  }

  return (
    <>
      <div className='card mm-setting-card'>
        <div className='card-body'>
          <div className='d-md-flex flex-wrap justify-content-between align-items-center'>
            <div className='mm-account-overview__add-account m-b-8 mb-md-0'>
              <span>Connected Accounts ({accountList.length}/{availableAccounts})</span>
              { needUpgrade &&
                <span className='upgrade-caption'>Upgrade your account to add more connections</span>
              }
            </div>
            <div>
              <button
                type='button'
                className='btn btn-outline-primary mm-button btn-lg'
                onClick={addAccount}
              >
                {needUpgrade ? 'Upgrade Plan' : 'Add Account' }
              </button>
            </div>
          </div>
        </div>
      </div>

      {Object.entries(accountsByProvider).map(([providerName, accounts], index) => (
        <div key={index}>
          <div className='card mm-setting-card mm-account-overview__peer-street'>
            <div className='card-body connected'>
              <div className='row pb-2 pt-1'>
                <div className='col-10 col-md-6'>
                  <div>
                    <img src={accounts[0].providerLogo || DefaultAvatar} className='mr-3 mr-md-4' alt='logo' />
                    <span className='mm-account-overview__block-title'>{providerName}</span>
                  </div>
                </div>
                <div className='col-2 col-md-1 order-md-2 text-right'>
                  <Refresh />
                </div>
                <div className='col-12 col-md-5 order-md-1 text-md-right pt-2 pt-md-0'>
                  <small className='text-gray'>Last updated {getRelativeDate(accountList[0].balancesFetchedAt)}</small>
                </div>
              </div>

              {accounts.map((account, accountIndex) => {
                return <AccountRow key={accountIndex} account={account} />;
              })}

              <div className='row py-3'>
                <div className='col-12 col-md-6'>
                  <div className='text-primary mm-account-overview__update-link mb-3 mb-md-0'>Update Credentials</div>
                </div>
                <div className='col-12 col-md-6'>
                  <div className='text-danger text-md-right mm-account-overview__delete-link'>
                    Delete account and remove data
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export const AccountRow: React.FC<AccountRowProps> = ({ account }) => {
  return (
    <div className='row py-3'>
      <div className='col col-md-8'>
        <div className='d-flex justify-content-between justify-content-md-start'>
          <span className='mm-switch-block mr-md-2'>
            <input type='checkbox' className='mm-switch-input' id={`mc3-${account.id}`} name='Switch' />
            <label className='mm-switch' htmlFor={`mc3-${account.id}`}></label>
          </span>
          <span className='connections-account-name'>{account.accountName}</span>
          <span className='connections-account-name'>{account.accountNumber? `(${account.accountNumber.slice(-4)})` : null}</span>
        </div>
      </div>
      <div className='col col-md-4'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='mm-account-overview__amount'>${numberWithCommas(fNumber(account.balance, 2))}</div>
          <Link to={`/account-details/${account.id}`}>
            <Edited />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const AccountErrorCard = () => {
  return (
    <div className='card mm-setting-card mm-account-overview__error'>
      <div className='card-body'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='mm-account-overview__error-title'>Connection error</div>
          <div>
            <button type='button' className='btn btn-outline-primary mm-button btn-lg'>
              Fix Connection
            </button>
          </div>
        </div>

        <hr />

        <div className='row pb-2 pt-1'>
          <div className='col-10 col-md-6'>
            <div>
              <WealthLogo className='mr-3 mr-md-4' />
              <span className='mm-account-overview__block-title'>Wealthfront</span>
            </div>
          </div>
          <div className='col-2 col-md-1 order-md-2 text-right'>
            <Refresh />
          </div>
          <div className='col-12 col-md-5 order-md-1 text-md-right pt-2 pt-md-0'>
            <small className='text-gray'>Last updated 10 days ago</small>
          </div>
        </div>

        <div className='row py-3'>
          <div className='col col-md-8'>
            <div className='d-flex justify-content-between justify-content-md-start align-items-center'>
              <span className='mm-switch-block mr-md-4'>
                <input type='checkbox' className='mm-switch-input' id='mc3' name='Switch' />
                <label className='mm-switch' htmlFor='mc3'></label>
              </span>
              <span>Account 01</span>
            </div>
          </div>
          <div className='col col-md-4'>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='mm-account-overview__amount'>$2,343</div>
              <Edited />
            </div>
          </div>
        </div>

        <div className='row py-3'>
          <div className='col col-md-8'>
            <div className='d-flex justify-content-between justify-content-md-start'>
              <span className='mm-switch-block mr-md-4'>
                <input type='checkbox' className='mm-switch-input' id='mc3' name='Switch' />
                <label className='mm-switch' htmlFor='mc3'></label>
              </span>
              <span>Account 02</span>
            </div>
          </div>
          <div className='col col-md-4'>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='mm-account-overview__amount'>$123,245</div>
              <Edited />
            </div>
          </div>
        </div>

        <div className='row py-3'>
          <div className='col-12 col-md-6'>
            <div className='text-primary mm-account-overview__update-link mb-3 mb-md-0'>Update Credentials</div>
          </div>
          <div className='col-12 col-md-6'>
            <div className='text-danger text-md-right mm-account-overview__delete-link'>
              Delete account and remove data
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AccountInfoCard = () => {
  return (
    <div className='card mm-setting-card mm-account-overview__info'>
      <div className='card-body'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='mm-account-overview__info-title'>Needs more info</div>
          <div>
            <button type='button' className='btn btn-outline-primary mm-button btn-lg'>
              Fix Connection
            </button>
          </div>
        </div>

        <hr />

        <div className='row pb-2 pt-1'>
          <div className='col-10 col-md-6'>
            <div>
              <WealthLogo className='mr-3 mr-md-4' />
              <span className='mm-account-overview__block-title'>Wealthfront</span>
            </div>
          </div>
          <div className='col-2 col-md-1 order-md-2 text-right'>
            <Refresh />
          </div>
          <div className='col-12 col-md-5 order-md-1 text-md-right pt-2 pt-md-0'>
            <small className='text-gray'>Last updated 10 days ago</small>
          </div>
        </div>

        <div className='row py-3'>
          <div className='col col-md-8'>
            <div className='d-flex justify-content-between justify-content-md-start align-items-center'>
              <span className='mm-switch-block mr-md-4'>
                <input type='checkbox' className='mm-switch-input' id='mc3' name='Switch' />
                <label className='mm-switch' htmlFor='mc3'></label>
              </span>
              <span>Account 01</span>
            </div>
          </div>
          <div className='col col-md-4'>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='mm-account-overview__amount'>$2,343</div>
              <Edited />
            </div>
          </div>
        </div>

        <div className='row py-3'>
          <div className='col col-md-8'>
            <div className='d-flex justify-content-between justify-content-md-start'>
              <span className='mm-switch-block mr-md-4'>
                <input type='checkbox' className='mm-switch-input' id='mc3' name='Switch' />
                <label className='mm-switch' htmlFor='mc3'></label>
              </span>
              <span>Account 02</span>
            </div>
          </div>
          <div className='col col-md-4'>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='mm-account-overview__amount'>$123,245</div>
              <Edited />
            </div>
          </div>
        </div>

        <div className='row py-3'>
          <div className='col-12 col-md-6'>
            <div className='text-primary mm-account-overview__update-link mb-3 mb-md-0'>Update Credentials</div>
          </div>
          <div className='col-12 col-md-6'>
            <div className='text-danger text-md-right mm-account-overview__delete-link'>
              Delete account and remove data
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
