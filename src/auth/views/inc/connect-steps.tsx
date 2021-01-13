import React from 'react';

import { ReactComponent as CircleIcon } from 'assets/images/signup/circle-icon.svg';
interface StepProps {
  isConnectAccount?: boolean;
  isAccountSettings?: boolean;
  isCompleted?: boolean;
  onSkip?: () => void;
  onFinish?: () => void;
}

const ConnectAccountSteps: React.FC<StepProps> = ({ isConnectAccount, isAccountSettings, isCompleted, onSkip, onFinish }) => {
  return (
    <div className='row'>
      <div className='action-overlay'>
        <div className='subs-content two'>
          <div className='account-mobile-content'>
            <p>
              <span className='step'>STEP</span>
              <br />
              {isAccountSettings ? '3/3' : '2/3'}
            </p>
          </div>
          <div className='connect-steps-wrap'>
            <div className={`step-content left-border ${isAccountSettings ? 'bg-purple' : ''}`}>
              <div className='step-icon'>
                <div className='mm-checked-icon' />
              </div>
              <span className='connect-text text-left'>Sign up</span>
            </div>
            <div className='step-content'>
              <div className='step-icon icon-two'>
                {
                  isConnectAccount ? 
                  <div className='mm-selected-icon'>
                    <div className='mm-selected-icon__outer'>
                      <div className='mm-selected-icon__inner' />
                    </div>
                  </div> : 
                  <div className='mm-checked-icon' />
                }
              </div>
              <span className='connect-text'>Connect accounts </span>
            </div>
            <div className='step-content right-border'>
              <div className={`step-icon icon-three ${!isConnectAccount ? 'selected' : ''}`}>
                {
                  isConnectAccount ? <CircleIcon /> :
                  <div className='mm-selected-icon'>
                    <div className='mm-selected-icon__outer'>
                      <div className='mm-selected-icon__inner' />
                    </div>
                  </div>
                }
              </div>
              <span className={`connect-text text-right ${!isAccountSettings ? 'action-next-step' : ''}`}>Link accounts</span>
            </div>
          </div>
        </div>
        <div className={!isConnectAccount ? 'subs-content four' : 'hide-me'}>
          <button className='finish-btn' onClick={isCompleted ? onFinish : onSkip}>
            {isCompleted ? 'Finish' : 'Skip'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectAccountSteps;
