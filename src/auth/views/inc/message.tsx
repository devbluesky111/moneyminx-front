import React from 'react';

import { ReactComponent as TickIcon } from 'assets/images/login/tick-icon.svg';
import { ReactComponent as CrossIcon } from 'assets/images/login/cross-icon.svg';

interface MessageProps {
  message: string;
  type: string;
}
const Message: React.FC<MessageProps> = ({ type, message }) => {
  const classes = type === 'success' ? 'message-container success' : 'message-container error';
  const icon = type === 'success' ? <TickIcon /> : <CrossIcon />;

  return (
    <div className={classes}>
      <div className='mm-container'>
        <div className='message-wrapper'>
          {icon} {message}
        </div>
      </div>
    </div>
  );
};

export default Message;
