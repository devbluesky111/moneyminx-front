import React, { useEffect, useState } from 'react';
import { Modal, ModalType } from 'common/components/modal';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { FacebookShareButton, PinterestShareButton, TwitterShareButton } from 'react-share';

import { useAuthState } from 'auth/auth.context';
import useFileDownload from 'common/hooks/useFileDownload';
import DefaultAvatar from 'assets/icons/default-avatar.svg';
import { ReactComponent as TwitterIcon } from 'assets/icons/twitter.svg';
import { ReactComponent as FacebookIcon } from 'assets/icons/facebook.svg';
import { ReactComponent as PinterestIcon } from 'assets/icons/pinterest.svg';
import useAllocationSetting from 'allocation/hooks/useAllocationSetting';
import CircularSpinner from 'common/components/spinner/circular-spinner';

interface ChartShareModalProps {
  chartShareModal: ModalType;
  chartComponent: React.ReactNode;
  chatLegendComponent: React.ReactNode;
}

const ChartShareModal: React.FC<ChartShareModalProps> = ({ chartShareModal, chartComponent, chatLegendComponent }) => {
  const { df, getImage } = useFileDownload();
  const { user } = useAuthState();
  const [blob, setBlob] = useState<any>(null);

  const { loading, settings }: { loading: boolean; settings: any } = useAllocationSetting();

  const getBlobImage = async () => {
    if (!blob) {
      const { image, error } = await getImage('allocation-share-card');
      if (!error) {
        setBlob(image);
      }
    }
  };

  useEffect(() => {}, []);

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
            <PinterestShareButton
              beforeOnClick={getBlobImage}
              url='www.github.com'
              media='www.github.com'
              className='share-button pinterest-share-button'
            >
              <PinterestIcon />
              Pin It
            </PinterestShareButton>
            <FacebookShareButton url='www.github.com' className='share-button facebook-share-button' disabled={!blob}>
              <FacebookIcon />
              Share
            </FacebookShareButton>
            <TwitterShareButton url='www.github.com' className='share-button twitter-share-button' disabled={!blob}>
              <TwitterIcon />
              Tweet
            </TwitterShareButton>
          </div>
          <div className='divider'>or</div>
          <div className='outline-button-wrapper'>
            <button className='btn-outline-primary mm-btn-animate'>Copy Image</button>
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
