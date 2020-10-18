import React from 'react';
import moment from 'moment';
import { Modal, ModalType } from 'common/components/modal';
import { Link } from 'react-router-dom';

interface Props {
  subscriptionEnd?: number | Date;
  subscriptionCancelModal: ModalType;
}

const SubscriptionCancelModal: React.FC<Props> = ({ subscriptionCancelModal, subscriptionEnd }) => {
  const endingDate = subscriptionEnd ? moment(subscriptionEnd).format('MM/DD/YY') : 'xx/xx/xx';

  return (
    <Modal {...subscriptionCancelModal.props} title='Sorry to see you go' canBeClosed>
      <div className='modal-wrapper signup-modal modal-md subscription-cancel-modal'>
        <p>
          Your account will remain active until <span>{endingDate}</span>. Please let us know why you decided to cancel
          and if there is anything we can do to improve our service by emailing{' '}
          <span className='link'>hello@moneyminx.com</span>.
        </p>
        <div className='modal-btn-wrapper'>
          <button
            className='mm-btn bg-primary mm-btn-primary-outline text-white'
            onClick={() => subscriptionCancelModal.close()}
          >
            Never mind
          </button>
          <div className='create-new-btn text-center'>
            <Link to='/dashboard'>Confirm Cancellation</Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionCancelModal;
