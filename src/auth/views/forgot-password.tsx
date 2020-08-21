import React from 'react';
import { AuthLayout } from 'layouts/auth.layout';

import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <ForgotPasswordMainSection />
    </AuthLayout>
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
