import React from 'react';
import WebsiteLayout from 'website/website.layout';

import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';
import { ReactComponent as LoginVisibilityIcon } from 'assets/images/login/visibility-icon.svg';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';

const CreateNewPassword = () => {
  return (
    <WebsiteLayout>
      <CreateNewPasswordMainSection />
      <SecondFooterSection />
    </WebsiteLayout>
  );
};
export default CreateNewPassword;
export const CreateNewPasswordMainSection = () => {
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
            <div className='credintials-content create-new-password'>
              <div className='logo-img-wrapper'>
                <LogoImg />
              </div>
              <h2>Create new Password</h2>
              <p>One last step. Enter a new password below and you should be good to go.</p>
              <div className='form-wrap'>
                <form>
                  <input type='Password' id='password' name='password' value='' placeholder='Set Password' />

                  <span className='visibility-icon'>
                    <LoginVisibilityIcon />
                  </span>
                  <input type='Password' id='password' name='password' value='' placeholder='Confirm Password' />

                  <span className='visibility-icon'>
                    <LoginVisibilityIcon />
                  </span>
                </form>

                <button className='bg-primary mm-btn-primary-outline'>Save Password</button>
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
    </div>
  );
};
