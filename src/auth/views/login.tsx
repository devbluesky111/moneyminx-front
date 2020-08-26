import React, { useState } from 'react';
import env from 'app/app.env';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { login } from 'auth/auth.service';
import { AuthLayout } from 'layouts/auth.layout';
import FacebookLogin from 'react-facebook-login';
import { useHistory, Link } from 'react-router-dom';
import { useAuthDispatch } from 'auth/auth.context';
import { postFacebookLogin } from 'api/request.api';
import { loginValidationSchema } from 'auth/auth.validation';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';
import { ReactComponent as LoginFacebookIcon } from 'assets/images/login/facebook-icon.svg';
import { ReactComponent as LoginVisibilityIcon } from 'assets/images/login/visibility-icon.svg';

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
  const dispatch = useAuthDispatch();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const responseFacebook = async (response: any) => {
    if (response.accessToken) {
      const { error } = await postFacebookLogin({
        accessToken: response.accessToken,
        mailChimpSubscription: true,
        subscriptionPriceId: 'price_1H9iXSAjc68kwXCHsFEhWShL',
      });
      if (!error) {
        toast('Successfully logged in', { type: 'success' });
      }
    }
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
                  initialValues={{ email: '', password: '' }}
                  validationSchema={loginValidationSchema}
                  onSubmit={async (values, actions) => {
                    const { error } = await login({ dispatch, payload: values });
                    actions.setSubmitting(false);

                    if (!error) {
                      toast('Sign in Success', { type: 'success' });
                      history.push('/auth/connect-account');
                    } else {
                      toast('Sign in Failed', { type: 'error' });
                    }
                  }}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
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
                        {props.errors.email && <div className='feedback'>{props.errors.email}</div>}
                      </div>
                      <div className='password-wrap'>
                        <input
                          name='password'
                          className='password'
                          placeholder='Password'
                          onBlur={props.handleBlur}
                          onChange={props.handleChange}
                          value={props.values.password}
                          type={passwordVisible ? 'text' : 'password'}
                        />
                        {props.errors.password && <div className='feedback'>{props.errors.password}</div>}
                        <span className='visibility-icon'>
                          <LoginVisibilityIcon onClick={() => setPasswordVisible(!passwordVisible)} />
                        </span>
                      </div>
                      <p>
                        <span className='forgot-pass'>
                          <Link to='/auth/forgot-password'>Forgot Password?</Link>
                        </span>
                      </p>
                      <button className='bg-primary mm-btn-primary-outline' type='submit'>
                        Log in
                      </button>
                    </form>
                  )}
                </Formik>

                <div className='facebook-login'>
                  <p>
                    Or, log in with:
                    <div className='fb-icon-wrap'>
                      <FacebookLogin
                        authType='reauthenticate'
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
                  Don’t have an account? <Link to='/signup'>Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
