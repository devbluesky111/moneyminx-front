import React, { useState } from 'react';

interface Props {
  title: string;
  open: boolean;
  backdrop?: boolean;
  canBeClosed?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}

const Modal: React.FC<Props> = ({ title, children, open, backdrop = true, onClose, canBeClosed = false }) => {
  const classNames = `${backdrop ? 'modal mm-modal-backdrop' : 'modal'} modal-${open ? 'show' : 'hide'}`;
  return (
    <div className={classNames} tabIndex={-1} role='dialog' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{title}</h5>
            {canBeClosed && (
              <button type='button' className='close' onClick={() => onClose()}>
                <span aria-hidden='true'>&times;</span>
              </button>
            )}
          </div>
          <div className='modal-body'>{children}</div>
        </div>
      </div>
    </div>
  );
};

function useModal(state: boolean = false) {
  const [open, setOpen] = useState(state);
  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    props: {
      open,
      onClose: () => setOpen(false),
    },
  };
}

export { Modal, useModal };
