import React from 'react';

import { Modal } from 'common/components/modal';

interface Props {
  planChangedModal: any;
  onSuccess: () => void;
}

const PlanChangedModal: React.FC<Props> = ({ planChangedModal, onSuccess }) => {
  return (
    <Modal {...planChangedModal.props} title='Plan Changed' size='md' canBeClosed onClose={onSuccess}>
      <div className='modal-wrapper signup-modal'>
        <p>Your plan changes are now complete.</p>
        <div className='modal-btn-wrapper'>
          <button className='mm-btn-animate mm-btn-primary' onClick={onSuccess}>
            Onwards!
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PlanChangedModal;
