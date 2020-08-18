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

const Signup = () => {
  return (
    <AuthLayout>
      <SignupMainSection />
    </AuthLayout>
  );
};
export default Signup;
export const SignupMainSection = () => {
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
                  initialValues={{ email: '', password: '' }}
                  validationSchema={loginValidationSchema}
                  onSubmit={async (values, actions) => {
                    const { error } = await login({ dispatch, payload: values });
                    actions.setSubmitting(false);

                    if (!error) {
                      toast('Sign up Success', { type: 'success' });
                    } else {
                      toast('Sign up Failed', { type: 'error' });
                    }
                  }}
                >
                  {(props) => (
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
                          type='password'
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
                          <LoginVisibilityIcon />
                        </span>
                      </div>
                      <div className='credintials-checkbox'>
                        <span className='checkbox-item'>
                          <label className='check-box'>
                            I accept the <a href='/terms'>Terms of Service</a>
                            <input type='checkbox' id='termsandservices' name='termsandservices' value='' />
                            <span className='geekmark'></span>
                          </label>
                        </span>

                        <span className='checkbox-item'>
                          <label className='check-box'>
                            Sign up for the newsletter
                            <input type='checkbox' id='newsletter-checkbox' name='newsletter-checkbox' value='' />
                            <span className='geekmark'></span>
                          </label>
                        </span>
                      </div>

                      <button className='bg-primary mm-btn-primary-outline' type='submit'>
                        Sign Up
                      </button>
                    </form>
                  )}
                </Formik>

                <div className='facebook-login'>
                  <p>
                    Or, sign up with:
                    <div className='fb-icon-wrap'>
                      <a href='link6'>
                        <LoginFacebookIcon />
                      </a>
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
    </div>
  );
};
