import React, { useState } from 'react';

interface InlineAlertProps {
  type?: 'warning' | 'info' | 'success' | 'danger';
  message: string;
  open: boolean;
  onClose: () => void;
}

export interface AlertType {
  open: () => void;
  close: () => void;
  props: {
    open: boolean;
    onClose: () => void;
  };
}

export const InlineAlert: React.FC<InlineAlertProps> = ({ message, open, onClose, type = 'warning' }) => {
  let classNames = `inline-alert bg-${type}`;
  classNames += !open ? ' hidden' : '';

  return (
    <div className={classNames}>
      {message}
      <button type='button' className='close' onClick={() => onClose()}>
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
};

export const useAlert = (): AlertType => {
  const [open, setOpen] = useState(false);

  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    props: {
      open,
      onClose: () => setOpen(false),
    },
  };
};
