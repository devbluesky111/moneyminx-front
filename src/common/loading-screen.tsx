import React, { useEffect, useState } from 'react';
import { ReactComponent as LogoWhiteImg } from 'assets/icons/money-minx-white-logo.svg';

interface ILoadingScreen {
  onModal?: boolean;
}
type TLoadingScreen = (props: ILoadingScreen) => JSX.Element;
const LoadingScreen: TLoadingScreen = ({ onModal }) => {
  return (
    <div>
      <div className={onModal ? 'modal-loading' : 'refresh-loading'}>
        <LogoWhiteImg className='loading-logo' />
        <MessageChange />
      </div>
    </div>
  );
};

export default LoadingScreen;

export const MessageChange = () => {
  const messageArr = [
    'Getting ready for the big reveal.',
    'Are you ready for your updated net worth?',
    "You can't get to your goals if you don't know where you are",
    "Here's to clarity",
    'Something else will be here soon',
  ];

  const [showingMessage, setShowingMessage] = useState<string>('Getting ready for the big reveal.');

  const showMessage: any = () => {
    const randomIndex = Math.floor(Math.random() * 5);
    if (messageArr[randomIndex] === showingMessage) {
      return showMessage();
    }

    setShowingMessage(messageArr[randomIndex]);
  };

  useEffect(() => {
    setTimeout(showMessage, 2000);
  });

  return <span className='mt-5'>{showingMessage}</span>;
};
