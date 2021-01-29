import React from 'react';

import { Modal, ModalType } from 'common/components/modal';

interface IAccountBalanceModal {
  accountBalanceModal: ModalType;
}

const AccountBalanceModal: React.FC<IAccountBalanceModal> = ({ accountBalanceModal }) => {
  return (
    <Modal {...accountBalanceModal.props} title='Account Balance Modal' canBeClosed>
      Account detail Modal
    </Modal>
  );
};

export default AccountBalanceModal;
