import env from 'app/app.env';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useHistory, Link } from 'react-router-dom';

import { AuthLayout } from 'layouts/auth.layout';
import { useModal } from 'common/components/modal';
import { useAuthDispatch } from 'auth/auth.context';
import { postFacebookLogin } from 'api/request.api';
import { appRouteConstants } from 'app/app-route.constant';
import { loginValidationSchema } from 'auth/auth.validation';
import { login, associateFacebookUser } from 'auth/auth.service';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { EMAIL_IS_EMPTY, PWD_IS_EMPTY } from 'lang/en/validation.json';
import { ReactComponent as HiddenIcon } from 'assets/icons/pass-hidden.svg';
import { ReactComponent as VisibleIcon } from 'assets/icons/pass-visible.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';
import { ReactComponent as LoginFacebookIcon } from 'assets/images/login/facebook-icon.svg';

import EmailNeededModal from './inc/email-needed.modal';
import AssociateEmailModal from './inc/associate-email.modal';

const Login = () => {
  return (
    <AuthLayout>
      <LoginMainSection />
    </AuthLayout>
  );
};

export default Login;

export const LoginMainSection = () => {
  const history = useHistory();
  const associateModal = useModal();
  const dispatch = useAuthDispatch();
  const emailNeededModal = useModal();
  const [fbToken, setFBToken] = useState<string>('');
  const [associateMessage, setAssociateMessage] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const visibilityIcon = passwordVisible ? <VisibleIcon /> : <HiddenIcon />;

  const responseFacebook = async (response: any) => {
    if (response.accessToken) {
      setFBToken(response.accessToken);
      const { error } = await postFacebookLogin({
        accessToken: response.accessToken,
        mailChimpSubscription: true,
        subscriptionPriceId: 'price_1H9iXSAjc68kwXCHsFEhWShL',
      });

      if (!error) {
        history.push(appRouteConstants.auth.CONNECT_ACCOUNT);
        toast('Successfully logged in', { type: 'success' });
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
      history.push(appRouteConstants.auth.CONNECT_ACCOUNT);
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
              <Link to='/'>
                <LogoImg className='icon' />
              </Link>
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
              <h2>Welcome back</h2>
              <p>Your accounts are ready for you. Hope you will reach your goals</p>
              <div className='form-wrap'>
                <Formik
                  validateOnChange={false}
                  initialValues={{ email: '', password: '' }}
                  validationSchema={loginValidationSchema}
                  onSubmit={async (values, actions) => {
                    const isEmailEmpty = isEmpty(values.email);
                    const isPasswordEmpty = isEmpty(values.password);
                    const hasEmptyFields = isEmailEmpty || isPasswordEmpty;

                    if (hasEmptyFields) {
                      if (isEmailEmpty) {
                        actions.setFieldError('email', EMAIL_IS_EMPTY);
                      }
                      if (isPasswordEmpty) {
                        actions.setFieldError('password', PWD_IS_EMPTY);
                      }
                      return false;
                    }

                    const { error } = await login({ dispatch, payload: values });
                    actions.setSubmitting(false);

                    if (!error) {
                      toast('Sign in Success', { type: 'success' });
                      history.push(appRouteConstants.auth.CONNECT_ACCOUNT);
                    } else {
                      actions.setFieldError('password', error.message || 'Please enter valid credentials');
                    }
                  }}
                >
                  {(props) => {
                    const { errors } = props;

                    const hasError = (field: 'email' | 'password') => errors[field];

                    const emailClass = hasError('email') ? 'email invalid' : 'email';
                    const passClass = hasError('password') ? 'password invalid' : 'password';

                    return (
                      <form onSubmit={props.handleSubmit}>
                        <div className='d-md-flex align-items-start input-wrapper'>
                          <div className='email-wrap'>
                            <input
                              type='email'
                              className={emailClass}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.email}
                              name='email'
                              placeholder='Email'
                            />
                          </div>
                          {hasError('email') ? (
                            <div className='ml-2 mt-1 mt-md-3 text-right feedback text-nowrap'>
                              {props.errors.email}
                            </div>
                          ) : null}
                        </div>

                        <div className='d-md-flex align-items-center'>
                          <div className='password-wrap'>
                            <input
                              name='password'
                              className={passClass}
                              placeholder='Password'
                              onBlur={props.handleBlur}
                              onChange={props.handleChange}
                              value={props.values.password}
                              type={passwordVisible ? 'text' : 'password'}
                            />
                            <span
                              className='visibility-icon'
                              onClick={() => setPasswordVisible(!passwordVisible)}
                              role='button'
                            >
                              {visibilityIcon}
                            </span>
                          </div>
                          {hasError('password') ? (
                            <div className='ml-2 mt-2 mt-md-0 text-right feedback text-nowrap'>
                              {props.errors.password}
                            </div>
                          ) : null}
                        </div>

                        <p>
                          <span className='forgot-pass'>
                            <Link to='/auth/forgot-password'>Forgot Password?</Link>
                          </span>
                        </p>
                        <button className='bg-primary mm-btn-primary-outline' type='submit' disabled={!props.isValid}>
                          Log in
                        </button>
                      </form>
                    );
                  }}
                </Formik>

                <div className='facebook-login'>
                  <p>
                    <span>Or, log in with:</span>
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
                  <div className='auth-end-element'>
                    Don’t have an account? <Link to='/signup'>Sign Up</Link>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AssociateEmailModal
        source='login'
        message={associateMessage}
        associateModal={associateModal}
        handleSuccess={handleFacebookAssociation}
      />

      <EmailNeededModal emailNeededModal={emailNeededModal} />
    </div>
  );
};
