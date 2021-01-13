import React from 'react';

import { Modal, ModalType } from 'common/components/modal';

interface Props {
    deleteAccountModal: ModalType;
    deleteAccountById: () => void;
}
const DeleteAccountModal: React.FC<Props> = ({ deleteAccountModal, deleteAccountById }) => {
    return (
        <Modal {...deleteAccountModal.props} title='Are you sure?' size='sm'>
            <div className='modal-wrapper'>
                <p>
                    Do you really want to delete this account? This process cannot be undone.
                </p>
                <div className='modal-btn-wrapper'>
                    <button
                        className='mm-btn-signup btn-outline-primary mm-btn-animate estimate-annual-block__btn-cancel'
                        onClick={() => deleteAccountModal.close()}
                    >
                        Cancel
                    </button>
                    <button
                        className='mm-btn-animate btn-danger'
                        onClick={() => { deleteAccountById(); deleteAccountModal.close(); }}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteAccountModal;
