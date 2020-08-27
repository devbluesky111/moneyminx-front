import React from 'react';
import { Modal } from 'common/components/modal';

interface Props {
  emailNeededModal: any;
}
const EmailNeededModal: React.FC<Props> = ({ emailNeededModal }) => {
  return (
    <Modal {...emailNeededModal.props} title='' size='sm'>
      <div className='modal-wrapper modal-sm'>
        <h4>Email Missing</h4>
        <p>
          Please enter a valid email address to continue. We never sell or abuse your email. It will strictly be used to
          communicate with you about your Money Minx account.
        </p>
        <div className='modal-btn-wrapper'>
          <button
            className='mm-btn bg-primary mm-btn-primary-outline text-white'
            onClick={() => emailNeededModal.close()}
          >
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmailNeededModal;
