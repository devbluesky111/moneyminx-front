import env from 'app/app.env';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from 'layouts/auth.layout';
import FacebookLogin from 'react-facebook-login';
import { useModal } from 'common/components/modal';
import { useAuthDispatch } from 'auth/auth.context';
import { postFacebookLogin } from 'api/request.api';
import { registerValidationSchema } from 'auth/auth.validation';
import { signup, associateFacebookUser } from 'auth/auth.service';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';
import { ReactComponent as LoginFacebookIcon } from 'assets/images/login/facebook-icon.svg';
import { ReactComponent as LoginVisibilityIcon } from 'assets/images/login/visibility-icon.svg';

import AssociateEmailModal from './associate-email';

const Signup = () => {
  return (
    <AuthLayout>
      <SignupMainSection />
    </AuthLayout>
  );
};
export default Signup;
export const SignupMainSection = () => {
  const associateModal = useModal();
  const dispatch = useAuthDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [fbLoggingIn, setFBLoggingIn] = useState<boolean>(false);
  const [associateMessage, setAssociateMessage] = useState<string>('');
  const [fbToken, setFBToken] = useState<string>('');

  const responseFacebook = async (response: any) => {
    if (response.accessToken) {
      setFBToken(response.accessToken);
      const { error } = await postFacebookLogin({
        accessToken: response.accessToken,
        mailChimpSubscription: true,
        subscriptionPriceId: 'price_1H9iXSAjc68kwXCHsFEhWShL',
      });

      if (!error) {
        toast('Successfully logged in', { type: 'success' });
      }
      if (error.statusCode === 409 && error.message) {
        setAssociateMessage(error.message);
        associateModal.open();
      }
    }
  };

  const handleFacebookAssociation = async () => {
    const { error } = await associateFacebookUser({ dispatch, token: fbToken });
    if (error) {
      toast('Association Failed', { type: 'error' });
    } else {
      toast('Association Success', { type: 'success' });
    }
    associateModal.close();
  };

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

          <div className='bg-white credintials-wrapper'>
            <div className='credintials-content'>
              <div className='logo-img-wrapper'>
                <LogoImg />
              </div>
              <h2>Track your net worth and portfolio in one place</h2>
              <p>
                All of your accounts in one place, start with our free for life account and upgrade only when you need
                more.
              </p>
              <div className='form-wrap'>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                    termsAccepted: false,
                    mailChimpSubscription: false,
                    subscriptionPriceId: 'price_1H9iXSAjc68kwXCHsFEhWShL',
                  }}
                  validationSchema={registerValidationSchema}
                  onSubmit={async (values, actions) => {
                    const { error } = await signup({ dispatch, payload: values });
                    actions.setSubmitting(false);

                    if (!error) {
                      toast('Signup Success', { type: 'success' });
                    } else {
                      toast('Sign up failed', { type: 'error' });
                    }
                  }}
                >
                  {(props) => {
                    return (
                      <form onSubmit={props.handleSubmit}>
                        <div id='email-wrap'>
                          <input
                            type='email'
                            id='email'
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.email}
                            name='email'
                            placeholder='Email'
                          />
                          {props.errors.email && (
                            <div id='feedback' className='signup'>
                              {props.errors.email}
                            </div>
                          )}
                        </div>
                        <div id='password-wrap'>
                          <input
                            type={visible ? 'text' : 'password'}
                            id='password'
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password}
                            name='password'
                            placeholder='Password'
                          />
                          {props.errors.password && (
                            <div id='feedback' className='signup'>
                              {props.errors.password}
                            </div>
                          )}
                          <span className='visibility-icon'>
                            <LoginVisibilityIcon onClick={() => setVisible(!visible)} />
                          </span>
                        </div>
                        <div className='credintials-checkbox'>
                          <span className='checkbox-item'>
                            <label className='check-box'>
                              I accept the <Link to='/terms'>Terms of Service</Link>
                              <input
                                type='checkbox'
                                id='terms'
                                name='termsAccepted'
                                aria-checked={props.values.termsAccepted}
                                checked={props.values.termsAccepted}
                                value={`${props.values.termsAccepted}`}
                                onChange={props.handleChange}
                              />
                              <span className='geekmark' />
                            </label>
                          </span>

                          <span className='checkbox-item'>
                            <label className='check-box'>
                              Sign up for the newsletter
                              <input
                                type='checkbox'
                                id='newsletter-checkbox'
                                name='mailChimpSubscription'
                                placeholder=''
                                aria-checked={props.values.mailChimpSubscription}
                                checked={props.values.mailChimpSubscription}
                                value={`${props.values.mailChimpSubscription}`}
                                onChange={props.handleChange}
                              />
                              <span className='geekmark' />
                            </label>
                          </span>
                        </div>

                        <button className='bg-primary mm-btn-primary-outline' type='submit' disabled={!props.isValid}>
                          Sign Up
                        </button>
                      </form>
                    );
                  }}
                </Formik>

                <div className='facebook-login'>
                  <p>
                    Or, sign up with:
                    <div className='fb-icon-wrap'>
                      {fbLoggingIn ? (
                        <FacebookLogin
                          autoLoad={true}
                          appId={env.FACEBOOK_APP_ID || ''}
                          callback={responseFacebook}
                          buttonStyle={{ display: 'none' }}
                        />
                      ) : null}

                      <LoginFacebookIcon onClick={() => setFBLoggingIn(true)} className='fb-login-icon' />
                    </div>
                  </p>
                </div>

                <p>
                  Already have an account? <a href='/login'>Log In</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AssociateEmailModal
        message={associateMessage}
        associateModal={associateModal.props}
        handleSuccess={handleFacebookAssociation}
      />
    </div>
  );
};
