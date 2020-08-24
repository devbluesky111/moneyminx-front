import React, { useState } from 'react';

interface Size {
  lg: string;
  md: string;
  sm: string;
}

interface Props {
  title: string;
  open: boolean;
  backdrop?: boolean;
  canBeClosed?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onError?: () => void;
  size?: keyof Size;
}

const Modal: React.FC<Props> = ({
  open,
  title,
  onClose,
  children,
  size = 'md',
  backdrop = true,
  canBeClosed = false,
}) => {
  const classNames = `${backdrop ? 'modal mm-modal-backdrop' : 'modal'} modal-${open ? 'show' : 'hide'}`;
  const modalClasses = `modal-dialog modal-dialog-centered modal-${size}`;

  return (
    <div className={classNames} tabIndex={-1} role='dialog' aria-hidden='true'>
      <div className={modalClasses} role='document'>
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
