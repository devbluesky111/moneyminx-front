import { Formik } from 'formik';
import React, { useState } from 'react';
import { AuthLayout } from 'layouts/auth.layout';
import { postForgotPassword } from 'api/request.api';
import { forgotPasswordValidation } from 'auth/auth.validation';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';

import Message from './inc/message';

const ExpiredLink = () => {
  return (
    <AuthLayout>
      <ExpiredLinkMainSection />
    </AuthLayout>
  );
};

export default ExpiredLink;

export const ExpiredLinkMainSection = () => {
  const [status, setStatus] = useState<string>('initial');
  const [message, setMessage] = useState<string>('');
  const [isMessage, setIsMessage] = useState<boolean>(false);

  const handleDismiss = () => {
    setIsMessage(false);
  };

  const isErrorMessage = status === 'error' && isMessage;
  const isSuccessMessage = status === 'success' && isMessage;

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
              <h2>Expired Link</h2>
              <p>The reset password link you are using already expired. Please request a new one below.</p>
              <Formik
                initialValues={{ email: '' }}
                validationSchema={forgotPasswordValidation}
                onSubmit={async (values, actions) => {
                  const { error, data } = await postForgotPassword(values.email);
                  if (error) {
                    setStatus('error');
                    setIsMessage(true);
                    setMessage(error.message || '');
                  } else {
                    setStatus('success');
                    setIsMessage(true);
                    setMessage(data.message || '');
                  }
                  actions.setSubmitting(false);
                }}
              >
                {(props) => (
                  <div className='form-wrap'>
                    <form onSubmit={props.handleSubmit}>
                      <input
                        type='email'
                        name='email'
                        value={props.values.email}
                        placeholder='Your Email'
                        onChange={props.handleChange}
                      />

                      <div>{props.errors.email ? props.errors.email : null}</div>

                      <button
                        className='bg-primary mm-btn-primary-outline mt-4'
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
      {isErrorMessage ? (
        <div>
          <Message type={status} message={message} onDismiss={handleDismiss} />
        </div>
      ) : null}

      {isSuccessMessage ? (
        <div>
          <Message type={status} message={message} onDismiss={handleDismiss} />
        </div>
      ) : null}
    </div>
  );
};
