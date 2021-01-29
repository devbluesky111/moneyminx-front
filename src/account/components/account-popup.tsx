import React from 'react';

import { Account } from 'auth/auth.types';
import { getRelativeDate } from 'common/moment.helper';
import CircularSpinner from 'common/components/spinner/circular-spinner';

export interface PopupProps {
  AccountDetails?: Account;
  handleConnectAccount: () => void;
  providerStatus: string;
}

const Popup: React.FC<PopupProps> = ({ AccountDetails, handleConnectAccount, providerStatus }) => {
  if (!AccountDetails) {
    return <CircularSpinner />;
  }

  return (
    <div className='popup'>
      <span className='pb-2'>Connection Status</span>
      <span className='pb-2'>
        {AccountDetails?.providerAccount?.dataset?.[0]?.lastUpdated?.toString() !==null ?
          'Last updated ' + getRelativeDate(AccountDetails?.providerAccount?.dataset?.[0]?.lastUpdated?.toString()) : 'Not yet updated'}
      </span>
      {providerStatus === 'ATTENTION_WAIT' ? (
        <span className='pt-2 pb-3'>
          For security reasons, your account cannot be refreshed at this time. Please try again in 15 minutes.
        </span>
      ) : (
        <span className='pt-2 pb-3'>Reauthorize your connection to continue syncing your account</span>
      )}
      {providerStatus !== 'ATTENTION_WAIT' ? (
        <button type='button' className='mm-btn-animate mm-btn-primary' onClick={handleConnectAccount}>
          Fix Connection
        </button>
      ) : null}
    </div>
  );
};

export default Popup;
