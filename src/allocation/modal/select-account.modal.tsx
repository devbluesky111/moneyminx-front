import React from 'react';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { Account } from 'auth/auth.types';
import { Modal, ModalType } from 'common/components/modal';
import { getCurrencySymbol } from 'common/currency-helper';

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

  return (
    <Modal {...selectAccountModal.props} title='Which account?' size='md' canBeClosed onClose={() => selectAccountModal.close()}>
      <div className='modal-wrapper'>
        <div className='mm-select-account-modal'>
          <p>This position is held in mutiple accounts, which account would you like to open?</p>
          {multiAccounts.map((item, index) => (
            <div key={index} className='row account-section mt-3' onClick={() => gotoDetailPage(item.id)} >
              {item?.providerLogo && <Image src={item.providerLogo} className='providerLogo col-sm-3' />}
              <div className='col-sm-9'>
                <p>
                  <span className='provider-name'>{item.providerName}</span>
                </p>
                <p className='d-flex justify-content-between description'>
                  <span>Join investment account</span>
                  <span>{getCurrencySymbol(item.currency)}2.343</span>
                </p>
                <p className='d-flex justify-content-between description'>
                  <span>Join investment account</span>
                  <span>{getCurrencySymbol(item.currency)}2.343</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default SelectAccountModal;
