import React from 'react';
import { Link } from 'react-router-dom';

import { Modal } from 'common/components/modal';
import { ReactComponent as SignupModalLogo } from 'assets/images/signup/signup-modal-logo.svg';

interface Props {
  signupModal: any;
  handleSuccess: () => void;
}

const SignUpDoneModal: React.FC<Props> = ({ signupModal, handleSuccess }) => {
  return (
    <Modal {...signupModal.props} title='Welcome to Money Minx' size='lg' onSuccess={handleSuccess} canBeClosed>
      <div className='modal-wrapper signup-modal'>
        <div className='signup-done-modal-logo'>
          <SignupModalLogo />
        </div>
        <p>
          Thanks for joining, we are thrilled to have you! Money Minx works best when you add all of your external
          accounts or track your accounts manually. Do you want to add more accounts now?
        </p>
        <div className='modal-btn-wrapper'>
          <button className='mm-btn-animate mm-btn-primary' onClick={handleSuccess}>
            Add more accounts
          </button>
          <div className='create-new-btn text-center'>
            <Link to='#' onClick={signupModal.close}>
              Go to Dashboard instead
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpDoneModal;
