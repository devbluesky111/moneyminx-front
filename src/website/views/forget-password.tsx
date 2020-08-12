import React from 'react';
import WebsiteLayout from 'website/website.layout';

import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as TickIcon } from 'assets/images/login/tick-icon.svg';
import { ReactComponent as CrossIcon } from 'assets/images/login/cross-icon.svg';

const ForgotPassword = () => {
  return (
    <WebsiteLayout>
      <ForgotPasswordMainSection />
      <SecondFooterSection />
    </WebsiteLayout>
  );
};
export default ForgotPassword;
export const ForgotPasswordMainSection = () => {
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
              <li>Find your institutions</li>
              <li>Connect it securily to Money Minx</li>
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

          <div className='bg-white credintials-wrapper'>
            <div className='credintials-content'>
              <div className='logo-img-wrapper'>
                <LogoImg />
              </div>
              <h2>Forgot Password?</h2>
              <p>Can’t log in? No worries, enter your email below and we will send you a password reset link.</p>
              <div className='form-wrap'>
                <form>
                  <input type='text' id='email' name='email' value='' placeholder='Your Email' />
                </form>

                <button className='bg-primary mm-btn-primary-outline'>Reset Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SecondFooterSection = () => {
  return (
    <div className='container-fluid mm-container-final footer-second'>
      <div className='row'>
        <div className='footer-table-wrapper'>
          <div className='footer-content'>
            <div className='copyright-text'>© 2020 Money Minx. All rights reserved.</div>
          </div>
          <div className='footer-content right-content'>
            <ul className='footer-list'>
              <li>
                <a href='link2'>Privacy Policy</a>
              </li>
              <li>
                <a href='link3'>Terms of Service</a>
              </li>
              <li>
                <a href='link4'>Notices</a>
              </li>
              <li>
                <a href='link5'>Resources</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='bottom-popup-message confirmation'>
        <p>
          <span className='popup-tick-icon'>
            <TickIcon />
          </span>
          Check your email for password recovery link!
        </p>
      </div>
      <div className='bottom-popup-message failure'>
        <p>
          <span className='popup-tick-icon'>
            <CrossIcon />
          </span>
          No internet connection. Please try again later.
        </p>
      </div>
    </div>
  );
};
