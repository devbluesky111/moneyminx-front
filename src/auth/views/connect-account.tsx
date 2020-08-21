import React from 'react';
import { AuthLayout } from 'layouts/auth.layout';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';
import { ReactComponent as ZillowIcon } from 'assets/images/signup/zillow.svg';
import { ReactComponent as CircleIcon } from 'assets/images/signup/circle-icon.svg';
import { ReactComponent as CheckIcon } from 'assets/images/signup/check-icon.svg';
import { ReactComponent as SelectedIcon } from 'assets/images/signup/selected.svg';
const Connectaccount = () => {
  return (
    <AuthLayout>
      <ConnectaccountMainSection />
    </AuthLayout>
  );
};
export default Connectaccount;
export const ConnectaccountMainSection = () => {
  return (
    <div className='main-table-wrapper'>
      <div className='mm-container mm-container-final'>
        <div className='row login-wrapper'>
          <div className='guide-content'>
            <div className='logo-img-wrap'>
              <LogoImg />
            </div>
            <h1>
              <span className='block'>Three easy steps to get </span>started with Money Minx
            </h1>
            <ul>
              <li>Find your accounts</li>
              <li>Connect it securely to Money Minx</li>
              <li>Let Money Minx to the rest</li>
            </ul>
            <div className='guide-bottom'>
              <h4>Serious about security</h4>
              <div className='guide-icon-wrap'>
                <span className='locked-icon'>
                  <LoginLockIcon />
                </span>
                <p>The security of your information is our top priority</p>
              </div>
              <h4>Trusted by investors</h4>
              <div className='guide-icon-wrap'>
                <span className='shield-icon'>
                  <LoginShieldIcon />
                </span>
                <p>Investors from all over the world are using Money Minx</p>
              </div>
            </div>
          </div>
          <div className='bg-white credintials-wrapper connect-wrap'>
            <div className='credintials-content connect-account'>
              <div className='logo-img-wrapper'>
                <LogoImg />
              </div>
              <h2>Connect banks</h2>
              <p>
                Money Minx partnered with Yodlee, a financial technology industry veteran, to facilitate aggregation of
                your accounts. Your account details are only stored at Yodlee, not in Money Minx’ database.
              </p>
              <button className='connect-account-btn bg-primary mm-btn-primary-outline' type='submit'>
                Connect an Account
              </button>
              <div className='manual-account-section'>
                <h2>
                  <span className='manual-heading'>Add a manual account instead</span>
                </h2>
                <p>
                  For the best experience we highly advice that you start with automated accounts first and then add
                  manual accounts.
                </p>
                <button className='manual-account-btn bg-white' type='submit'>
                  Add Manual Account
                </button>
                <h2>
                  <span className='manual-heading'>Add real estate</span>
                </h2>
                <div className='zillow-wrap'>
                  <button className='manual-account-btn bg-white' type='submit'>
                    Add Real Estate
                  </button>
                  <span className='zillow-img'>
                    <ZillowIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='subscription-bottom-text connect-account'>
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
                <span className='connect-text text-right'>Link accounts</span>
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
    </div>
  );
};
