import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface Size {
  lg: string;
  md: string;
  sm: string;
  xs: string;
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

export interface ModalType {
  open: () => void;
  close: () => void;
  props: {
    open: boolean;
    onClose: () => void;
  };
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
              <div onClick={() => onClose()} className='close' role='button'>
                <AiOutlineClose />
              </div>
            )}
          </div>
          <div className='modal-body'>{children}</div>
        </div>
      </div>
    </div>
  );
};

function useModal(state: boolean = false): ModalType {
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
