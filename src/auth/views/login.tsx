import React from 'react';
import { Formik } from 'formik';
import { login } from 'auth/auth.service';
import { LoginPayload } from 'auth/auth.types';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from 'layouts/auth.layout';
import { useModal, Modal } from 'common/components/modal';
import { appRouteConstants } from 'app/app-route.constant';
import { loginValidationSchema } from 'auth/auth.validation';
import { Link, useLocation, Redirect } from 'react-router-dom';

import LoginForm from './login-form';

import { useAuthDispatch, useAuthState } from '../auth.context';

const initialValues: LoginPayload = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const loginModal = useModal(true);
  const dispatch = useAuthDispatch();

  const { isAuthenticated } = useAuthState();

  const { from } = (location.state as any) || { from: { pathname: '/' } };

  const isFromLogout = from?.pathname === appRouteConstants.auth.logout;

  const at = (text: string) => t(`auth.${text}`);

  if (isAuthenticated) {
    if (isFromLogout) {
      return <Redirect to='/' />;
    }
    return <Redirect to={from} />;
  }

  return (
    <AuthLayout>
      <Modal title={'Restaurant Login'} {...loginModal.props}>
        <Formik
          validateOnBlur
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={async (values, actions) => {
            await login({ dispatch, payload: values });
            actions.setSubmitting(false);
          }}
        >
          {(props) => {
            return <LoginForm props={props} />;
          }}
        </Formik>
        <div className='text-center mt-4'>
          <Link to='/register' className='primary-link text-primary '>
            {at('NEW_KHAJA_STATION')}
          </Link>
        </div>
      </Modal>
    </AuthLayout>
  );
};

export default Login;
