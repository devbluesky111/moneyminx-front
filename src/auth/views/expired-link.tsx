import { Formik } from 'formik';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { postForgotPassword } from 'api/request.api';
import { forgotPasswordValidation } from 'auth/auth.validation';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';

import Message from './inc/message';
import AuthFooter from './auth.footer';

const ExpiredLink = () => {
  return <ExpiredLinkMainSection />;
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

  const isFeedback = isErrorMessage || isSuccessMessage;
  const footerClass = isFeedback ? 'd-md-none d-lg-none d-xl-none' : '';

  return (
    <div className='main-table-wrapper'>
      <div className=''>
        <div className='row login-wrapper'>
          <div className='guide-content'>
            <Link to='/'>
              <LogoImg className='icon auth-logo' />
            </Link>

            <div className='auth-left-content'>
              <h1>Three easy steps to get started with Money Minx</h1>
              <ul>
                <li>Find your accounts</li>
                <li>Connect it securely to Money Minx</li>
                <li>Let Money Minx do the rest</li>
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
          </div>

          <div className='bg-white credentials-wrapper'>
            <div className='credentials-content'>
              <div className='logo-img-wrapper'>
                <LogoImg className='auth-logo'/>
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
                        className='email email-wrap'
                        type='email'
                        name='email'
                        value={props.values.email}
                        placeholder='Your Email'
                        onChange={props.handleChange}
                      />

                      <div className='feedback'>{props.errors.email ? props.errors.email : null}</div>

                      <button
                        className='mm-btn-animate mm-btn-primary'
                        disabled={!props.isValid || props.isSubmitting}>
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
      <div className={footerClass}>
        <AuthFooter />
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
