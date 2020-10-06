import { Modal, ModalType } from 'common/components/modal';
import React from 'react';

interface FieldChangeModal {
  fieldChangeModal: ModalType;
}

const FieldChangeModal: React.FC<FieldChangeModal> = ({ fieldChangeModal }) => {
  return (
    <Modal {...fieldChangeModal.props} title='' canBeClosed>
      <div className='modal-wrapper chart-setting-modal modal-md'>Chart setting modal here</div>
    </Modal>
  );
};

export default FieldChangeModal;
