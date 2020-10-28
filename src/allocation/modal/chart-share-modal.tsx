import React, { useEffect, useRef, useState } from 'react';
import { FacebookShareButton, PinterestShareButton, TwitterShareButton } from 'react-share';

import { useAuthState } from 'auth/auth.context';
import { postUploadChart } from 'api/request.api';
import { Modal, ModalType } from 'common/components/modal';
import useFileDownload from 'common/hooks/useFileDownload';
import DefaultAvatar from 'assets/icons/default-avatar.svg';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { ReactComponent as TwitterIcon } from 'assets/icons/twitter.svg';
import useAllocationSetting from 'allocation/hooks/useAllocationSetting';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { ReactComponent as FacebookIcon } from 'assets/icons/facebook.svg';
import { ReactComponent as PinterestIcon } from 'assets/icons/pinterest.svg';

interface ChartShareModalProps {
  chartShareModal: ModalType;
  chartComponent: React.ReactNode;
  chatLegendComponent: React.ReactNode;
}

export enum ShareTypeEnum {
  PINTEREST = 'PINTEREST',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
}

const ChartShareModal: React.FC<ChartShareModalProps> = ({ chartShareModal, chartComponent, chatLegendComponent }) => {
  const { user } = useAuthState();
  const { df, getImage } = useFileDownload();
  const [imageUrl, setImageUrl] = useState<string>();
  const [copySuccess, setCopySuccess] = useState(false);

  const { loading, settings }: { loading: boolean; settings: any } = useAllocationSetting();

  const pinterestButtonRef = useRef<any>(null);
  const twitterShareButtonRef = useRef<any>(null);
  const facebookShareButtonRef = useRef<any>(null);

  useEffect(() => {
    if (copySuccess) {
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    }
  }, [copySuccess]);

  const getButtonRef = (type: ShareTypeEnum) => {
    return {
      [ShareTypeEnum.PINTEREST]: pinterestButtonRef,
      [ShareTypeEnum.FACEBOOK]: facebookShareButtonRef,
      [ShareTypeEnum.TWITTER]: twitterShareButtonRef,
    }[type];
  };

  const getImageURL = async () => {
    const { image, error } = await getImage('allocation-share-card');

    if (!error) {
      const formData = new FormData();
      formData.append('file', image);
      const { data, error: uploadError } = await postUploadChart(formData);

      if (!uploadError) {
        setImageUrl(() => data?.url);

        return data?.url;
      }

      return null;
    }

    return null;
  };

  const getBlobImage = async (type: ShareTypeEnum) => {
    const buttonRef = getButtonRef(type);

    if (imageUrl) {
      return buttonRef?.current?.click();
    }

    const imageURl = await getImageURL();

    if (imageURl) {
      return buttonRef?.current?.click();
    }
  };

  const handleCopyToClipboard = async () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl);

      return setCopySuccess(true);
    }

    const imageURl = await getImageURL();

    if (imageURl) {
      navigator.clipboard.writeText(imageURl);

      return setCopySuccess(true);
    }
  };

  if (loading) {
    return <CircularSpinner />;
  }

  return (
    <Modal {...chartShareModal.props} title='Share' size='md' canBeClosed onClose={() => chartShareModal.close()}>
      <div className='modal-wrapper chart-setting-modal mm-setting-modal'>
        <div className='allocation-share-card-wrapper'>
          <div id='allocation-share-card'>
            <div className='allocation-share-card-heading'>
              <span className='allocation-share-card-heading--title'>
                {settings?.title || 'Replace me with the chart title'}
              </span>
              <div className='float-right'>
                <img
                  src={user?.picture || DefaultAvatar}
                  className='allocation-share-card-heading--avatar'
                  alt='Profile avatar'
                />
                <span className='allocation-share-card-heading--username'>@{user?.username || 'moneyminx'}</span>
              </div>
            </div>
            <div className='chart-legend-wrapper'>
              {chartComponent}
              {chatLegendComponent}
            </div>
            <div className='allocation-share-card-footer'>
              <Logo />
              <span className='float-right'>moneyminx.com</span>
            </div>
          </div>
          <div className='share-button-wrapper'>
            <button
              className='share-button pinterest-share-button'
              onClick={() => getBlobImage(ShareTypeEnum.PINTEREST)}
            >
              <PinterestIcon />
              Pin It
            </button>
            <button className='share-button facebook-share-button' onClick={() => getBlobImage(ShareTypeEnum.FACEBOOK)}>
              <FacebookIcon />
              Share
            </button>
            <button className='share-button twitter-share-button' onClick={() => getBlobImage(ShareTypeEnum.TWITTER)}>
              <TwitterIcon />
              Tweet
            </button>
            <PinterestShareButton
              ref={pinterestButtonRef}
              url={imageUrl ? imageUrl : 'https://app.moneyminx.com/'}
              media={imageUrl ? imageUrl : 'https://app.moneyminx.com/'}
              className='d-none share-button pinterest-share-button'
            >
              <PinterestIcon />
              Pin It
            </PinterestShareButton>
            <FacebookShareButton
              ref={facebookShareButtonRef}
              url={imageUrl ? imageUrl : 'https://app.moneyminx.com/'}
              className='d-none share-button facebook-share-button'
            >
              <FacebookIcon />
              Share
            </FacebookShareButton>
            <TwitterShareButton
              ref={twitterShareButtonRef}
              url={imageUrl ? imageUrl : 'https://app.moneyminx.com/'}
              className='d-none share-button twitter-share-button'
            >
              <TwitterIcon />
              Tweet
            </TwitterShareButton>
          </div>
          <div className='divider'>or</div>
          <div className='outline-button-wrapper'>
            <button className='btn-outline-primary mm-btn-animate' onClick={handleCopyToClipboard}>
              {copySuccess ? 'Copied' : 'Copy Image'}
            </button>
            <button
              className='btn-outline-primary mm-btn-animate'
              onClick={() => df('allocation-share-card', 'my-awesome-allocation')}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChartShareModal;
