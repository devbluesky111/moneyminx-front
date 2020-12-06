import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Account } from 'auth/auth.types';
import { groupByProviderName } from 'auth/auth.helper';
import { getRefreshedProfile, deleteAccounts, deleteAccountById } from 'auth/auth.service';
import { appRouteConstants } from 'app/app-route.constant';
import { getRelativeDate } from '../../common/moment.helper';
import useGetSubscription from 'auth/hooks/useGetSubscription';
import { pricingDetailConstant } from 'common/common.constant';
import { useAuthDispatch, useAuthState } from 'auth/auth.context';
import { fNumber, numberWithCommas } from 'common/number.helper';
import useCurrentSubscription from 'auth/hooks/useCurrentSubscription';
import CircularSpinner from 'common/components/spinner/circular-spinner';

import DefaultAvatar from 'assets/icons/default-avatar.svg';
/*import { ReactComponent as Refresh } from 'assets/icons/refresh.svg';*/
import { ReactComponent as DeleteIcon } from 'assets/icons/icon-delete.svg';
import { ReactComponent as IconEdit } from 'assets/icons/icon-edit.svg';
import { ReactComponent as DefaultProviderLogo } from 'assets/icons/mm-default-provider.svg';

import {
  AccountCardProps,
  AccountRowProps,
  ManualAccountProps,
  AccountOverviewProps,
  SubscriptionConnectionWarningProps,
  AccountDialogBoxProps
} from 'setting/setting.type';
import { ReactComponent as SubscriptionWarning } from 'assets/images/subscription/warning.svg';
import { ReactComponent as BackIcon } from 'assets/images/subscription/back-btn.svg';

export const AccountOverview: React.FC<AccountOverviewProps> = ({ reviewSubscriptionFlag= false }) => {
  const history = useHistory();
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

  const verifyAccountNumbers = (event: React.ChangeEvent<any>) => {
    event.preventDefault()
    if ((numberOfConnectedAccounts === 'Unlimited') || (manualAccounts.length <= numberOfManualAccounts && connectedAccounts.length <= numberOfConnectedAccounts)) {
      history.push(appRouteConstants.networth.NET_WORTH)
      return
    }
    toast('Kindly remove accounts first.', { type: 'error' });
  }

  return (
    <section className='mm-account-overview'>
      {reviewSubscriptionFlag && <SubscriptionConnectionWarning availableConnectedAccounts={numberOfConnectedAccounts} availableManualAccounts={numberOfManualAccounts} />}
      <AccountCard accountList={connectedAccounts} availableAccounts={numberOfConnectedAccounts} reviewSubscriptionFlag={reviewSubscriptionFlag}/>
      <ManualAccounts manualAccountList={manualAccounts} availableAccounts={numberOfManualAccounts} reviewSubscriptionFlag={reviewSubscriptionFlag}/>
      {reviewSubscriptionFlag && <AccountDialogBox verifyAccountNumbers={verifyAccountNumbers} availableConnectedAccounts={numberOfConnectedAccounts} availableManualAccounts={numberOfManualAccounts} accountList={connectedAccounts} manualAccountList={manualAccounts} />}
    </section>
  );
};

export const ManualAccounts: React.FC<ManualAccountProps> = ({ manualAccountList, availableAccounts, reviewSubscriptionFlag }) => {
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const [deleting, setDeleting] = useState<boolean>(false);
  const needUpgrade = manualAccountList.length >= availableAccounts;

  const addAccount = () => {
    if(reviewSubscriptionFlag) {
      history.push(appRouteConstants.subscription.SUBSCRIPTION);
      return
    }
    if (!needUpgrade) {
      history.push(appRouteConstants.auth.CONNECT_ACCOUNT);
    } else {
      history.push(`${appRouteConstants.settings.SETTINGS}?active=Plan`)
    }
  }

  const removeAccounts = async (accounts: Account[]) => {
    setDeleting(true);
    const { error } = await deleteAccounts({ dispatch, accounts });
    if (error) {
      toast('Error occurred deleting account', { type: 'error' });
    }
    setDeleting(false);
  }

  return (
    <>
      <div className='card mm-setting-card'>
        <div className='d-md-flex flex-wrap justify-content-between align-items-center'>
          <div className={`mm-account-overview__add-account m-b-8 mb-md-0 ${needUpgrade ? 'text-danger' : ''}`}>
            <span>Manual Accounts ({manualAccountList.length}/{availableAccounts})</span>
            {needUpgrade ? <span className='upgrade-caption'>Upgrade your account to add more accounts</span> : null}
          </div>
          <div>
            <button
              type='button'
              className='btn btn-outline-primary mm-button btn-lg'
              onClick={addAccount}
            >
              {needUpgrade || reviewSubscriptionFlag ? 'Upgrade Plan' : 'Add Account'}
            </button>
          </div>
        </div>
      </div>
      <div className='card mm-setting-card mm-account-overview__account'>
        <div className='row pb-2 pt-1'>
          <div className='col-10 col-md-6'>
            <div>
              <DefaultProviderLogo className='mr-3 mr-md-4' />
              <span className='mm-account-overview__block-title'>My own account</span>
            </div>
          </div>
        </div>

        {manualAccountList.map((acc, index) => {
          return <AccountRow account={acc} key={index} reviewSubscriptionFlag={reviewSubscriptionFlag}/>;
        })}

        <div className='row py-3 align-items-center'>
          <div className='col-12 col-md-6' />
          <div className='col-12 col-md-6 text-md-right'>
            <button className='btn text-danger mm-button__flat mm-account-overview__delete-link '
              onClick={() => { removeAccounts(manualAccountList) }}
              disabled={deleting}>
              {deleting ? <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true' /> : null}
              <span className={'ml-1'}> {deleting ? 'Deleting...' : 'Delete account and remove data'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const AccountCard: React.FC<AccountCardProps> = ({ accountList, availableAccounts, reviewSubscriptionFlag }) => {
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const [deleting, setDeleting] = useState<boolean>(false);
  const needUpgrade = accountList.length >= availableAccounts;
  const accountsByProvider = groupByProviderName(accountList);

  const addAccount = () => {
    if(reviewSubscriptionFlag) {
      history.push(appRouteConstants.subscription.SUBSCRIPTION);
      return
    }
    if (!needUpgrade) {
      history.push(appRouteConstants.auth.CONNECT_ACCOUNT);
    } else {
      history.push(`${appRouteConstants.settings.SETTINGS}?active=Plan`)
    }
  }

  const removeAccounts = async (accounts: Account[]) => {
    setDeleting(true);
    const { error } = await deleteAccounts({ dispatch, accounts });
    if (error) {
      toast('Error occurred deleting account', { type: 'error' });
    }
    setDeleting(false);
  }

  return (
    <>
      <div className='card mm-setting-card'>
        <div className='d-md-flex flex-wrap justify-content-between align-items-center'>
          <div className={`mm-account-overview__add-account m-b-8 mb-md-0 ${needUpgrade ? 'text-danger' : ''}`}>
            <span>Connected Accounts ({accountList.length}/{availableAccounts})</span>
            {needUpgrade ? <span className='upgrade-caption'>Upgrade your account to add more connections</span> : null}
          </div>
          <div>
            <button
              type='button'
              className='btn btn-outline-primary mm-button btn-lg'
              onClick={addAccount}
            >
              {needUpgrade || reviewSubscriptionFlag ? 'Upgrade Plan' : 'Add Account'}
            </button>
          </div>
        </div>
      </div>

      {Object.entries(accountsByProvider).map(([providerName, accounts], index) => (
        <div key={index}>
          <div className='card mm-setting-card mm-account-overview__connected'>
            <div className='row pb-2 pt-1 align-items-center'>
              <div className='col-10 col-md-6'>
                <div>
                  <img src={accounts[0].providerLogo || DefaultAvatar} className='mr-3 mr-md-4 accounts-provider-logo' alt={`${providerName} logo`} />
                  <span className='mm-account-overview__block-title'>{providerName}</span>
                </div>
              </div>
              {/* TODO Refresh single account when API is ready
                <div className='col-2 col-md-1 order-md-2 text-right'>
                  <Refresh />
                </div>*/}
              <div className='col-12 col-md-6 order-md-1 text-md-right pt-2 pt-md-0'>
                <small className='text-gray'>Last updated {getRelativeDate(accountList[0].balancesFetchedAt)}</small>
              </div>
            </div>

            {accounts.map((account, accountIndex) => {
              return <AccountRow key={accountIndex} account={account} reviewSubscriptionFlag={reviewSubscriptionFlag}/>;
            })}

            <div className='row py-3 align-items-center no-gutters'>
              <div className='col-12 col-md-6'>
                {!reviewSubscriptionFlag ? <a className='purple-links mm-account-overview__update-link mb-3 mb-md-0 ml-3' href='/'>Update Credentials</a> :''}
              </div>
              <div className='col-12 col-md-6 mt-2 text-md-right'>
                <button className='btn text-danger mm-button__flat mm-account-overview__delete-link '
                  onClick={() => { removeAccounts(accounts) }}
                  disabled={deleting}>
                  {deleting ? <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true' /> : null}
                  <span className={'ml-1'}> {deleting ? 'Deleting...' : 'Delete account and remove data'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export const AccountRow: React.FC<AccountRowProps> = ({ account, reviewSubscriptionFlag }) => {
  const dispatch = useAuthDispatch();
  const [deleting, setDeleting] = useState<boolean>(false);

  const deleteAccount = async (id: number) => {
    setDeleting(true);
    const { error } = await deleteAccountById({ dispatch, id });
    if (error) {
      toast('Error occurred deleting account', { type: 'error' });
    }
    setDeleting(false);
  }

  return (
    <div className='row py-3 align-items-center no-gutters'>
      <div className='col-6 col-md-8'>
        {/*TODO Ability to switch accounts on or off (needs API)*/}
        {/*<span className='mm-switch-block mr-md-2'>
            <input type='checkbox' className='mm-switch-input' id={`mc3-${account.id}`} name='Switch' />
            <label className='mm-switch' htmlFor={`mc3-${account.id}`}></label>
          </span>*/}
        {account.accountName} {account.accountNumber ? ` (${account.accountNumber.slice(-4)})` : null}
      </div>
      <div className='col-3 col-md-2'>
        ${numberWithCommas(fNumber(account.balance, 2))}
      </div>
      <div className='col-3 col-md-2'>
        <div className='float-right'>
          {!reviewSubscriptionFlag ? <Link to={`/account-details/${account.id}`}><IconEdit className='edit-icon'/></Link> : null}
          {deleting ? <span className='spinner-grow spinner-grow-sm m-1' role='status' aria-hidden='true' /> :
            <DeleteIcon className='ml-2 ml-md-3 trash-icon' onClick={() => deleteAccount(account.id)} />
          }
        </div>
      </div>
    </div>
  );
};

export const SubscriptionConnectionWarning: React.FC<SubscriptionConnectionWarningProps> = ({ availableConnectedAccounts, availableManualAccounts }) => {
  return (
    <div className='row'>
      <div className='subs-ended-msg-box'>
        <div className='subs-ended-left'>
          <h4>Too many connections for current plan!</h4>
          <p>
            Your current plan only allows for {availableConnectedAccounts} connections, please remove connections to continue
            using Money Minx.
          </p>
        </div>
        <span className='warning-icon'>
          <SubscriptionWarning />
        </span>
      </div>
    </div>
  )
};

const AccountDialogBox: React.FC<AccountDialogBoxProps> = ({ verifyAccountNumbers, availableConnectedAccounts, availableManualAccounts, manualAccountList, accountList }) => {
  const disable = availableManualAccounts === 'Unlimited' || (manualAccountList.length <= availableManualAccounts && accountList.length <= availableConnectedAccounts) ? false : true
  const connectedAccountDiff = accountList.length - parseInt(availableConnectedAccounts as string, 10)
  const manualAccountDiff = manualAccountList.length - parseInt(availableManualAccounts as string, 10)

  return (
    <div className='action-overlay'>
      <div className='subscription-bottom-text'>
        <div className='subs-content one'>
          <a href='link12' onClick={(event) => { verifyAccountNumbers(event) }}>
            <span className='back-btn'>
              <BackIcon />
            </span>
          </a>
        </div>
        <div className='subs-content three'>
          <p>You need to delete {connectedAccountDiff > 0 ? connectedAccountDiff : 0} connected accounts and {manualAccountDiff > 0 ? manualAccountDiff : 0} manual to be able to use this plan.</p>
        </div>
        <div className='subs-content four'>
          <button className='finish-btn' disabled={disable} onClick={(event) => { verifyAccountNumbers(event) }}>
            Finish
          </button>
        </div>
      </div>
    </div>
  )
}
