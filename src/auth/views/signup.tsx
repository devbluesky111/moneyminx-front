import env from 'app/app.env';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

import { AuthLayout } from 'layouts/auth.layout';
import { useModal } from 'common/components/modal';
import { useAuthDispatch } from 'auth/auth.context';
import { postFacebookLogin } from 'api/request.api';
import { StringKeyObject } from 'common/common.types';
import { registerValidationSchema } from 'auth/auth.validation';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { signup, associateFacebookUser } from 'auth/auth.service';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as HiddenIcon } from 'assets/icons/pass-hidden.svg';
import { ReactComponent as VisibleIcon } from 'assets/icons/pass-visible.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';
import { ReactComponent as LoginFacebookIcon } from 'assets/images/login/facebook-icon.svg';

import EmailNeededModal from './inc/email-needed.modal';
import AssociateEmailModal from './inc/associate-email.modal';

const Signup = () => {
  return (
    <AuthLayout>
      <SignupMainSection />
    </AuthLayout>
  );
};
export default Signup;
export const SignupMainSection = () => {
  const history = useHistory();
  const location = useLocation();
  const associateModal = useModal();
  const emailNeededModal = useModal();
  const dispatch = useAuthDispatch();
  const [fbToken, setFBToken] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [associateMessage, setAssociateMessage] = useState<string>('');

  const priceId = queryString.parse(location.search).priceId as string;

  const [validator, setValidator] = useState<number>(0);

  const reg1 = /^.{8,}$/;
  const reg2 = /(^.*\d+.*$)/;
  const reg3 = /(^.*[@$!%*#?&].*$)/;
  const reg4 = /(^.*[A-Z].*$)/;

  const visibilityIcon = visible ? <VisibleIcon /> : <HiddenIcon />;

  const getValidationText = () => {
    if (validator < 3) {
      return {
        text: 'Weak, please choose another',
        classNames: 'text-danger ',
      };
    }
    if (validator < 4) {
      return {
        text: 'Medium',
        classNames: 'text-warning',
      };
    }
    return {
      text: 'Strong',
      classNames: 'text-success',
    };
  };

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
        history.push('/connect-account');
      } else {
        if (error?.statusCode === 400 && error?.message) {
          emailNeededModal.open();
        }

        if (error?.statusCode === 409 && error?.message) {
          setAssociateMessage(error.message);
          associateModal.open();
        }
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
            <Link className='logo-img-wrap' to='/'>
              <LogoImg />
            </Link>
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
                    subscriptionPriceId: priceId || 'price_1H9iXSAjc68kwXCHsFEhWShL',
                  }}
                  validate={async (values) => {
                    let a = 0;
                    let errors: StringKeyObject = {};
                    [reg1, reg2, reg3, reg4].forEach((reg) => (reg.test(values.password) ? (a += 1) : a));
                    setValidator(a);
                    try {
                      await registerValidationSchema.validate(values, { abortEarly: false });
                    } catch (errs) {
                      const mappedError = errs.inner.reduce((obj: StringKeyObject, cur: any) => {
                        obj[cur.path] = cur.message;
                        return obj;
                      }, {});
                      errors = mappedError;
                    }
                    return errors;
                  }}
                  onSubmit={async (values, actions) => {
                    if (!values.termsAccepted) {
                      actions.setFieldError('termsAccepted', 'You forgot to accept our terms of service');
                      return;
                    }
                    const { error } = await signup({ dispatch, payload: values });
                    actions.setSubmitting(false);

                    if (!error) {
                      toast('Signup Success', { type: 'success' });
                      history.push('/connect-account');
                    } else {
                      actions.setFieldError('password', error?.message || 'Sign up failed');
                    }
                  }}
                >
                  {(props) => {
                    return (
                      <form onSubmit={props.handleSubmit}> 
                       <div className='d-md-flex align-items-start input-wrapper'>
                        <div className='email-wrap'>
                          <input
                            type='email'
                            className='email'
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.email}
                            name='email'
                            placeholder='Email'
                          />

                        </div>
                          {props.errors.email && <div className='ml-2 mt-1 mt-md-3 text-right feedback text-nowrap'>{props.errors.email}</div>}
                       </div>
                        <div className='d-md-flex align-items-center'>
                          <div className='password-wrap'>
                            <input
                              type={visible ? 'text' : 'password'}
                              className='password'
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.password}
                              name='password'
                              placeholder='Password'
                            />
                            <span className='visibility-icon' onClick={() => setVisible(!visible)} role='button'>
                              {visibilityIcon}
                            </span>
                          </div>
                          {props.values.password ? (
                            <div
                              className={`ml-2 mt-2 mt-md-0 text-right text-nowrap ${getValidationText().classNames}`}
                            >
                              {getValidationText().text}
                            </div>
                          ) : null}
                        </div>
                        {props.errors.password && (
                          <div className='feedback mt-2 text-right'>{props.errors.password}</div>
                        )}

                        <div className='credintials-checkbox'>
                          <span className='checkbox-item'>
                            <label className='check-box'>
                              I accept the{' '}
                              <a href='/terms' target='_blank'>
                                Terms of Service
                              </a>
                              <input
                                type='checkbox'
                                className='terms'
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
                                className='newsletter-checkbox'
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

                        {props.errors.termsAccepted && (
                          <div className='feedback mb-4 text-right'>{props.errors.termsAccepted}</div>
                        )}

                        <button
                          className='bg-primary mm-btn-primary-outline'
                          type='submit'
                          disabled={!props.isValid || props.isSubmitting}
                        >
                          Sign Up
                        </button>
                      </form>
                    );
                  }}
                </Formik>

                <div className='facebook-login'>
                  <p>
                    <span> Or, sign up with: </span>
                    <div className='fb-icon-wrap'>
                      <FacebookLogin
                        authType='rerequest'
                        textButton=''
                        fields='email'
                        isMobile={false}
                        autoLoad={false}
                        reAuthenticate={true}
                        callback={responseFacebook}
                        scope='public_profile,email'
                        icon={<LoginFacebookIcon />}
                        appId={env.FACEBOOK_APP_ID || ''}
                        buttonStyle={{
                          background: 'transparent',
                          padding: 0,
                        }}
                      />
                    </div>
                  </p>
                </div>

                <p>
                <div className='loginPage-end-element'>
                  Already have an account? <Link to='/login'>Log In</Link>
                </div>
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

      <EmailNeededModal emailNeededModal={emailNeededModal} />
    </div>
  );
};
