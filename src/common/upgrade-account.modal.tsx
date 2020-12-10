import React from 'react';
import { useHistory } from 'react-router-dom';

import { appRouteConstants } from 'app/app-route.constant';
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
                        You have reached the maximum allowed accounts for your plan. Upgrade your account to add more.
                    </p>
                    :
                    <p>
                        Your plan only allows for {availableNumber} connected account. Click below to compare plans and upgrade or add manual account instead.
                    </p>
                }
                <div className='modal-btn-wrapper'>
                    <button
                        className='mm-btn-signup btn-outline-primary mm-btn-animate estimate-annual-block__btn-cancel'
                        onClick={() => { history.push('/settings?active=Plan'); upgradeAccountModal.close() }}
                        style={{ width: manualMax ? '210.28px' : 'inherit' }}
                    >
                        Compare Plans
                    </button>
                    {!manualMax && <button
                        className='mm-btn-animate add-manual-account'
                        onClick={() => { history.push(appRouteConstants.auth.CONNECT_ACCOUNT); upgradeAccountModal.close(); }}
                    >
                        Add Manual Account
                    </button>}
                </div>
            </div>
        </Modal>
    );
};

export default UpgradeAccountModal;
