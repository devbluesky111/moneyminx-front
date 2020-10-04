import React from 'react';
import { ReactComponent as CheckIcon } from 'assets/images/signup/check-icon.svg';
import { ReactComponent as SelectedIcon } from 'assets/images/signup/selected.svg';
import { ReactComponent as CircleIcon } from 'assets/images/signup/circle-icon.svg';

const ConnectAccountSteps = () => {
  return <ConnectAccountStepsSection />;
};
export default ConnectAccountSteps;
export const ConnectAccountStepsSection = () => {
  return (
    <div className='row'>
      <div className='action-overlay'>
        <div className='subs-content two'>
          <div className='account-mobile-content'>
            <p>
              <span className='step'>STEP</span>
              <br />
              2/3
            </p>
          </div>
          <div className='connect-steps-wrap'>
            <div className='step-content left-border'>
              <div className='step-icon'>
                <CheckIcon />
              </div>
              <span className='connect-text text-left'>Sign up</span>
            </div>
            <div className='step-content'>
              <div className='step-icon icon-two'>
                <SelectedIcon />
              </div>
              <span className='connect-text'>Connect banks </span>
            </div>
            <div className='step-content right-border'>
              <div className='step-icon icon-three'>
                <CircleIcon />
              </div>
              <span className='connect-text text-right action-next-step'>Link accounts</span>
            </div>
          </div>
        </div>
        <div className='subs-content four'>
          <button className='finish-btn'>
            <a href='link11'>Next Step</a>
          </button>
        </div>
      </div>
    </div>
  );
};
