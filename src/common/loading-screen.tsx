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
    'Queue the suspenseful music...',
    'I see you baby, loading that page...',
    'I bet you wish this page would work work work work work.',
    'Got your mind on your money and your money on your mind?',
    'I like big bucks and I can not lie.',
    'Like Axl says, just a little patience. Mmm, yeahhh.',
    'Whoa, we\'re half way there. Whoaaaaa living on a prayer...',
    'I still haven\'t found what I\'m looking for...'
  ];

  const [showingMessage, setShowingMessage] = useState<string>('I like big bucks and I can not lie.');

  const showMessage: any = () => {
    const randomIndex = Math.floor(Math.random() * 8);
    if (messageArr[randomIndex] === showingMessage) {
      return showMessage();
    }

    setShowingMessage(messageArr[randomIndex]);
  };

  useEffect(() => {
    setTimeout(showMessage, 2500);
  });

  return <span className='mt-5'>{showingMessage}</span>;
};
