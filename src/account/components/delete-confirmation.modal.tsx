import React from 'react';

import { Modal, ModalType } from 'common/components/modal';

export interface IDeleteConfirmationContent {
  message: string;
  cancelText: string;
  deleteText: string;
}

interface Props {
  deleteConfirmationModal: ModalType;
  onSuccess: () => void;
  content?: IDeleteConfirmationContent;
}

const defaultConfirmationContent: IDeleteConfirmationContent = {
  cancelText: 'Cancel',
  deleteText: 'Delete Account',
  message: 'Do you really want to delete this account? This process cannot be undone.',
};

const DeleteConfirmationModal: React.FC<Props> = ({
  onSuccess,
  deleteConfirmationModal,
  content = defaultConfirmationContent,
}) => {
  return (
    <Modal {...deleteConfirmationModal.props} title='Are you sure?' size='sm' canBeClosed>
      <div className='modal-wrapper'>
        <p>{content.message}</p>
        <div className='modal-btn-wrapper'>
          <button
            className='mm-btn-signup mm-btn-primary mm-btn-animate'
            onClick={deleteConfirmationModal.close}
            type='button'
          >
            {content.cancelText}
          </button>
          <button className='mm-btn-animate text-danger' onClick={onSuccess} type='button'>
            {content.deleteText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
