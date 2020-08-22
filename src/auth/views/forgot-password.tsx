import React, { useState } from 'react';
import { AuthLayout } from 'layouts/auth.layout';

import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';
import { Formik } from 'formik';
import { postForgotPassword } from 'api/request.api';
import { forgotPasswordValidation } from 'auth/auth.validation';
import Message from './inc/message';

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <ForgotPasswordMainSection />
    </AuthLayout>
  );
};

export default ForgotPassword;

export const ForgotPasswordMainSection = () => {
  const [status, setStatus] = useState<string>('initial');
  const [message, setMessage] = useState<string>('');
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

          <div className='bg-white credintials-wrapper'>
            <div className='credintials-content'>
              <div className='logo-img-wrapper'>
                <LogoImg />
              </div>
              <h2>Forgot Password?</h2>
              <p>Can’t log in? No worries, enter your email below and we will send you a password reset link.</p>
              <Formik
                initialValues={{ email: '' }}
                validationSchema={forgotPasswordValidation}
                onSubmit={async (values, actions) => {
                  const { error, data } = await postForgotPassword(values.email);
                  if (error) {
                    setStatus('error');
                    setMessage(error.message || '');
                  } else {
                    setStatus('success');
                    setMessage(data.message || '');
                  }
                  actions.setSubmitting(false);
                }}
              >
                {(props) => (
                  <div className='form-wrap'>
                    <form onSubmit={props.handleSubmit}>
                      <div id='email-wrap'>
                        <input
                          type='text'
                          id='email'
                          name='email'
                          value={props.values.email}
                          placeholder='Your Email'
                          onChange={props.handleChange}
                        />
                        {props.errors.email && <div id='feedback'>{props.errors.email}</div>}
                      </div>
                      <button
                        className='bg-primary mm-btn-primary-outline'
                        type='submit'
                        disabled={!props.isValid || props.isSubmitting}
                      >
                        Reset Password
                      </button>
                    </form>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Message />
      {status === 'error' ? <div>{message}</div> : null}
      {status === 'success' ? <div>{message}</div> : null}
    </div>
  );
};
