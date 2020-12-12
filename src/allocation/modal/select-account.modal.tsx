import React from 'react';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { Account } from 'auth/auth.types';
import { getCurrencySymbol } from 'common/currency-helper';
import { groupByProviderName } from 'auth/auth.helper';
import { Modal, ModalType } from 'common/components/modal';

interface SelectAccountModal {
  selectAccountModal: ModalType;
  multiAccounts: Account[];
}

const SelectAccountModal: React.FC<SelectAccountModal> = ({ selectAccountModal, multiAccounts }) => {

  const history = useHistory();

  const gotoDetailPage = async (id: number) => {
    selectAccountModal.close();
    return history.push('/account-details/' + id);
  }

  const accountsByProvider = groupByProviderName(multiAccounts);
  console.log(accountsByProvider)

  return (
    <Modal {...selectAccountModal.props} title='Which account?' size='md' canBeClosed onClose={() => selectAccountModal.close()}>
      <div className='modal-wrapper'>
        {accountsByProvider &&
          <div className='mm-select-account-modal'>
            <p>This position is held in mutiple accounts, which account would you like to open?</p>

            {Object.entries(accountsByProvider).map(([providerName, accounts], index) => (
              <div key={index} className='row account-section mt-3'>
                {accounts[0].providerLogo && <Image src={accounts[0].providerLogo} className='providerLogo col-sm-3' />}
                <div className='col-sm-9'>
                  <p>
                    <span className='provider-name'>{providerName}</span>
                  </p>
                  {accounts.map((item, i) => (
                    <p className='d-flex justify-content-between description' onClick={() => gotoDetailPage(item.id)}>
                      <span>{item.accountName}</span>
                      <span>{getCurrencySymbol(item.currency)}{item.balance}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </Modal>
  );
};

export default SelectAccountModal;
