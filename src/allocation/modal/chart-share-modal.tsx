import React from 'react';
import { Modal, ModalType } from 'common/components/modal';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { FacebookShareButton, PinterestShareButton, TwitterShareButton } from 'react-share';

import useFileDownload from 'common/hooks/useFileDownload';
import { ReactComponent as TwitterIcon } from 'assets/icons/twitter.svg';
import { ReactComponent as FacebookIcon } from 'assets/icons/facebook.svg';
import { ReactComponent as PinterestIcon } from 'assets/icons/pinterest.svg';

interface ChartShareModalProps {
  chartShareModal: ModalType;
  chartComponent: React.ReactNode;
  chatLegendComponent: React.ReactNode;
}

const ChartShareModal: React.FC<ChartShareModalProps> = ({ chartShareModal, chartComponent, chatLegendComponent }) => {
  const { df } = useFileDownload();

  return (
    <Modal {...chartShareModal.props} title='' canBeClosed onClose={() => chartShareModal.close()}>
      <div className='modal-wrapper chart-setting-modal modal-md mm-setting-modal'>
        <div className='mm-setting-modal__title'>Share</div>
        <div className='allocation-share-card-wrapper'>
          <div id='allocation-share-card'>
            <div className='chart-legend-wrapper'>
              {chartComponent}
              {chatLegendComponent}
            </div>
            <div className='allocation-share-card-footer'>
              <Logo />
              <a href='www.moneyminx.com'>moneyminx.com</a>
            </div>
          </div>
          <div className='share-button-wrapper'>
            <PinterestShareButton
              url='www.github.com'
              media='www.github.com'
              className='share-button pinterest-share-button'
            >
              <PinterestIcon />
              Pin It
            </PinterestShareButton>
            <FacebookShareButton url='www.github.com' className='share-button facebook-share-button'>
              <FacebookIcon />
              Share
            </FacebookShareButton>
            <TwitterShareButton url='www.github.com' className='share-button twitter-share-button'>
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
