import { Modal, ModalType } from 'common/components/modal';
import React from 'react';

interface SettingModalProps {
  settingModal: ModalType;
}

const SettingModal: React.FC<SettingModalProps> = ({ settingModal }) => {
  return (
    <Modal {...settingModal.props} title='' canBeClosed>
      <div className='modal-wrapper chart-setting-modal modal-md'>Chart setting modal here</div>
    </Modal>
  );
};

export default SettingModal;
