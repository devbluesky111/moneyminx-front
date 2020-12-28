import React, { useEffect, useState } from 'react';

import { ReactComponent as LogoWhiteImg } from 'assets/icons/money-minx-white-logo.svg';
import { accountFetchingMessageArray, authenticatingMessageArray } from '@mm/data/loading-message';

interface ILoadingScreen extends IMessageChange {
  onModal?: boolean;
}

interface IMessageChange {
  onAccountFetching?: boolean;
}

type TLoadingScreen = (props: ILoadingScreen) => JSX.Element;
const LoadingScreen: TLoadingScreen = ({ onModal, onAccountFetching }) => {
  return (
    <div>
      <div className={onModal ? 'modal-loading' : 'refresh-loading'}>
        <LogoWhiteImg className='loading-logo' />
        <MessageChange onAccountFetching={onAccountFetching} />
      </div>
    </div>
  );
};

export default LoadingScreen;

export const MessageChange = ({ onAccountFetching = false }: IMessageChange) => {
  const messageArr = onAccountFetching ? accountFetchingMessageArray : authenticatingMessageArray;
  const initialMessage = onAccountFetching ? accountFetchingMessageArray[0] : authenticatingMessageArray[0];

  const [showingMessage, setShowingMessage] = useState<string>(initialMessage);
  const [index, setIndex] = useState(0);

  const showMessage: any = () => {
    const randomIndex = Math.floor(Math.random() * 7);
    if (messageArr[randomIndex] === showingMessage) {
      return showMessage();
    }

    setShowingMessage(messageArr[randomIndex]);
  };

  const showAccountFetchingMessage = () => {
    setShowingMessage(messageArr[index + 1]);
    if (index >= messageArr.length - 2) {
      return setIndex(0);
    }
    setIndex((i) => i + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onAccountFetching) {
        showAccountFetchingMessage();
      } else {
        showMessage();
      }
    }, 3000);
    return () => clearTimeout(timer);
  });

  return <span className='mt-5'>{showingMessage}</span>;
};
