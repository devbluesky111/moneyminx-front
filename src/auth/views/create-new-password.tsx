import { Formik } from 'formik';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';

import useParam from 'common/hooks/useParam';
import { AuthLayout } from 'layouts/auth.layout';
import { postResetPassword } from 'api/request.api';
import { resetPasswordValidation } from 'auth/auth.validation';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as HiddenIcon } from 'assets/icons/pass-hidden.svg';
import { ReactComponent as VisibleIcon } from 'assets/icons/pass-visible.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';

const CreateNewPassword = () => {
  return (
    <AuthLayout>
      <CreateNewPasswordMainSection />
    </AuthLayout>
  );
};

export const CreateNewPasswordMainSection = () => {
  const { token } = useParam();
  const history = useHistory();

  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = () => {
    setVisible({ ...visible, password: !visible.password });
  };

  const toggleConfirmPasswordVisibility = () => {
    setVisible({ ...visible, confirmPassword: !visible.confirmPassword });
  };

  if (!token) {
    return <Redirect to='/auth/forgot-password' />;
  }

  const getVisibilityIcon = (field: 'password' | 'confirmPassword') => {
    if (visible[field]) {
      return <VisibleIcon />;
    }
    return <HiddenIcon />;
  };

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
              <h2>Create new Password</h2>
              <p>One last step. Enter a new password below and you should be good to go.</p>
              <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                validationSchema={resetPasswordValidation}
                onSubmit={async (values, actions) => {
                  const { error } = await postResetPassword({ password: values.password, token });
                  if (error) {
                    history.push('/password/token-expired');
                  } else {
                    toast('Password reset successful, Please login with new credentials', { type: 'success' });
                    history.push('/login');
                  }
                }}
              >
                {(props) => {
                  return (
                    <div className='form-wrap'>
                    <form onSubmit={props.handleSubmit}>
                        <div className='input-wrapper'>
                          <div className='password-wrap'>
                          <input
                            type={visible.password ? 'text' : 'password'}
                            id='password'
                            className='password'
                            name='password'
                            placeholder='Set Password'
                            value={props.values.password}
                            onChange={props.handleChange}
                          />
                          <span className='visibility-icon' onClick={togglePasswordVisibility} role='button'>
                            {getVisibilityIcon('password')}</span>
                        </div>
                          {props.errors.password && <div className='mt-2 feedback'>{props.errors.password}</div>}
                        </div>
                      <div className='input-wrapper'>
                      <div className='password-wrap confirm'>
                        <input
                          type={visible.confirmPassword ? 'text' : 'password'}
                          className='password'
                          name='confirmPassword'
                          onChange={props.handleChange}
                          placeholder='Confirm Password'
                          value={props.values.confirmPassword}
                        />
                        <span className='visibility-icon' onClick={toggleConfirmPasswordVisibility} role='button'>
                            {getVisibilityIcon('confirmPassword')}
                          </span>
                        <div className='feedback'>
                          {props.errors.confirmPassword ? props.errors.confirmPassword : null}
                        </div>
                      </div>
                      </div>
                        <button
                          className='mm-btn-animate mm-btn-primary m-b-5'
                          disabled={props.isSubmitting}
                          type='submit'>
                          Save Password
                        </button>
                      </form>
                    </div>
                  );
                }}
              </Formik>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
