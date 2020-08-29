import React from 'react';
import { Modal } from 'common/components/modal';

interface Props {
  associateModal: any;
  message: string;
  handleSuccess: () => void;
}
const AssociateEmailModal: React.FC<Props> = ({ associateModal, message, handleSuccess }) => {
  return (
    <Modal {...associateModal} title='' onSuccess={handleSuccess} size='sm'>
      <div className='modal-wrapper modal-sm'>
        <h4>Existing Account Found</h4>
        <p>{message}</p>
        <div className='modal-btn-wrapper'>
          <button className='mm-btn bg-primary mm-btn-primary-outline text-white' onClick={handleSuccess}>
            Yes, I want 1 account
          </button>
        </div>
        <div className='create-new-btn text-center'>
          <a href='/signup'>Create a new account instead</a>
        </div>
      </div>
    </Modal>
  );
};

export default AssociateEmailModal;
