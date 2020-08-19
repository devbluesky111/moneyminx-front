import React from 'react';
import { Modal } from 'common/components/modal';

interface Props {
  associateModal: any;
  message: string;
  handleSuccess: () => void;
}
const AssociateEmailModal: React.FC<Props> = ({ associateModal, message, handleSuccess }) => {
  return (
    <Modal {...associateModal} title='Associate with Facebook' onSuccess={handleSuccess}>
      <h4>{message}</h4>
      <div className='modal-btn-wrapper'>
        <button className='mm-btn bg-primary mm-btn-primary-outline text-white' onClick={handleSuccess}>
          Yes
        </button>
        <button className='mm-btn btn-warning' onClick={() => associateModal.close()}>
          No
        </button>
      </div>
    </Modal>
  );
};

export default AssociateEmailModal;
