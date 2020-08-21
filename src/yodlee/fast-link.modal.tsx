import { Modal } from 'common/components/modal';
import React, { useEffect, useRef } from 'react';

import useYodlee from './useYodlee';
import { FastLinkOptionsType } from './yodlee.type';

interface Props {
  fastLinkModal: any;
  handleSuccess?: () => void;
  fastLinkOptions: FastLinkOptionsType;
}
const FastLinkModal: React.FC<Props> = ({ fastLinkModal, handleSuccess, fastLinkOptions }) => {
  const initRef = useRef<any>();

  const onSuccess = (args: any) => {
    console.log('_____________args on success__________', args);
  };
  const onError = (args: any) => {
    console.log('_____________args on error__________', args);
  };
  const onExit = (args: any) => {
    console.log('_____________args onExit __________', args);
  };
  const onEvent = (args: any) => {
    console.log('_____________args onEvent  __________', args);
  };

  const { init } = useYodlee({
    fastLinkOptions,
    onSuccess,
    onError,
    onEvent,
    onExit,
  });

  const token = (fastLinkOptions.token as any) || '';
  const open = fastLinkModal?.props?.open;

  useEffect(() => {
    initRef?.current?.click();
  }, [open]);

  const handleInit = () => {
    init({ tokenValue: token, tokenType: 'AccessToken' });
  };

  return (
    <Modal {...fastLinkModal.props} title='' onSuccess={handleSuccess} canBeClosed>
      <div id='fastlinkContainer' />
      <button ref={initRef} onClick={handleInit} className='hidden' />
    </Modal>
  );
};

export default FastLinkModal;
