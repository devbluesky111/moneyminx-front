import React from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { login } from 'auth/auth.service';
import { AuthLayout } from 'layouts/auth.layout';
import { useAuthDispatch } from 'auth/auth.context';
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
  const dispatch = useAuthDispatch();
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
                    } else {
                      toast('Sign in Failed', { type: 'error' });
                    }
                  }}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      <input
                        type='email'
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.email}
                        name='email'
                        placeholder='Email'
                      />
                      {props.errors.email && <div id='feedback'>{props.errors.email}</div>}
                      <input
                        type='password'
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.password}
                        name='password'
                        placeholder='Password'
                      />
                      {props.errors.password && <div id='feedback'>{props.errors.password}</div>}
                      <span className='visibility-icon'>
                        <LoginVisibilityIcon />
                      </span>
                      <p>
                        <span className='forgot-pass'>
                          <a href='link7'>Forgot Password?</a>
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
                      <a href='link6'>
                        <LoginFacebookIcon />
                      </a>
                    </div>
                  </p>
                </div>

                <p>
                  Don’t have an account? <a href='moneyminx'>Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
