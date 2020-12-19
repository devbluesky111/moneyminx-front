import React from 'react';
import { useHistory } from 'react-router-dom';

import { Modal, ModalType } from 'common/components/modal';

interface Props {
    upgradeAccountModal: ModalType;
    availableNumber: number;
    manualMax: boolean;
}

const UpgradeAccountModal: React.FC<Props> = ({ upgradeAccountModal, availableNumber, manualMax }) => {
    const history = useHistory();
    return (
        <Modal {...upgradeAccountModal.props} title='Upgrade your account' size='md' canBeClosed={true}>
            <div className='modal-wrapper'>
                {manualMax ?
                    <p>
                        Your plan allows for {manualMax} manual accounts. Click below to compare plans and upgrade.
                    </p>
                    :
                    <p>
                        Your plan allows for {availableNumber} connected accounts. Click below to compare plans and upgrade.
                    </p>
                }
                <div className='modal-btn-wrapper modal-button-and-text-link'>
                    <button
                        className='mm-btn-animate mm-btn-primary'
                        onClick={() => { history.push('/settings?active=Plan'); upgradeAccountModal.close() }}
                    >
                        Compare Plans
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default UpgradeAccountModal;
