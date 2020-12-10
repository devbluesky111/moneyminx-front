import React from 'react';
import { useHistory, Link } from 'react-router-dom';

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
                        Your plan allows for {availableNumber} connected accounts. Click below to compare plans and upgrade or add a manual account instead.
                    </p>
                }
                <div className='modal-btn-wrapper modal-button-and-text-link'>
                    <button
                        className='mm-btn-animate mm-btn-primary'
                        onClick={() => { history.push('/settings?active=Plan'); upgradeAccountModal.close() }}
                    >
                        Compare Plans
                    </button>
                    {!manualMax &&
                    <div className='text-center'>
                      <Link className='link-gray' to='/connect-account' onClick={() => { history.push(appRouteConstants.auth.CONNECT_ACCOUNT); upgradeAccountModal.close(); }}>Add Manual Account</Link>
                    </div>
                    }
                </div>
            </div>
        </Modal>
    );
};

export default UpgradeAccountModal;
