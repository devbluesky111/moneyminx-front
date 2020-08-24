import React from 'react';
import { Modal } from 'common/components/modal';

interface Props {
  associateModal: any;
  message: string;
  handleSuccess: () => void;
}
const AssociateEmailModal: React.FC<Props> = ({ associateModal, message, handleSuccess }) => {
  return (
    <Modal {...associateModal} open={true} title='' onSuccess={handleSuccess}>
      <div className='modal-wrapper modal-sm'>
        <h4>Existing Account Found</h4>
        <p>
          Looks like you are trying to sign in with a new login method. Do you want to associate your xxxx with your
          yyyy account?
        </p>
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
