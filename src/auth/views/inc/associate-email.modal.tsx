import React from 'react';
import { useHistory } from 'react-router-dom';

import { Modal } from 'common/components/modal';
import { appRouteConstants } from 'app/app-route.constant';

interface Props {
  associateModal: any;
  message: string;
  handleSuccess: () => void;
  source?: 'login' | 'signup';
}
const AssociateEmailModal: React.FC<Props> = ({ associateModal, message, handleSuccess, source = 'signup' }) => {
  const history = useHistory();

  let link: string = '/signup';
  let acceptText: string = 'Yes, I want 1 account';
  let rejectText: string = 'Create a new account instead';

  if (source === 'login') {
    link = appRouteConstants.auth.LOGIN;
    acceptText = 'Yes please';
    rejectText = 'No, login by email';
  }

  const handleRejection = () => {
    history.push(link);
    associateModal.close();
  };

  return (
    <Modal {...associateModal.props} title='' onSuccess={handleSuccess} size='sm'>
      <div className='modal-wrapper modal-sm'>
        <h4>Existing Account Found</h4>
        <p>{message}</p>
        <div className='modal-btn-wrapper'>
          <button className='mm-btn-animate mm-btn-primary' onClick={handleSuccess}>
            {acceptText}
          </button>
        </div>
        <div className='create-new-btn text-center' onClick={handleRejection} role='button'>
          <p>{rejectText}</p>
        </div>
      </div>
    </Modal>
  );
};

export default AssociateEmailModal;
