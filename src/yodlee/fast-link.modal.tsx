import { Modal } from 'common/components/modal';
import React, { useEffect, useRef, useState } from 'react';

import useYodlee from './useYodlee';
import { FastLinkOptionsType } from './yodlee.type';
import { toast } from 'react-toastify';
import { getRefreshedProfile } from 'auth/auth.service';
import { useAuthDispatch } from 'auth/auth.context';
import CircularSpinner from 'common/components/spinner/circular-spinner';

interface Props {
  fastLinkModal: any;
  handleSuccess: () => void;
  fastLinkOptions: FastLinkOptionsType;
}
const FastLinkModal: React.FC<Props> = ({ fastLinkModal, handleSuccess, fastLinkOptions }) => {
  const initRef = useRef<any>();
  const dispatch = useAuthDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const onSuccess = () => {
    toast('Successfully Logged in with Yodlee', { type: 'success' });
  };

  const onError = () => {
    toast('Error Occurred', { type: 'error' });
  };

  const onExit = async (args: any) => {
    setLoading(true);
    const { error } = await getRefreshedProfile({ dispatch });
    if (error) {
      toast('Error Occurred on Fetching user Details', { type: 'error' });
    }
    setLoading(false);
    handleSuccess();
  };

  const { init } = useYodlee({
    fastLinkOptions,
    onSuccess,
    onError,
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
    <Modal {...fastLinkModal.props} title='' canBeClosed>
      <div id='fastlinkContainer' />
      {loading ? <CircularSpinner /> : null}
      <button ref={initRef} onClick={handleInit} className='hidden' />
    </Modal>
  );
};

export default FastLinkModal;
