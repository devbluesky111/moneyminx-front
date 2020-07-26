import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import RegisterForm from './register-form';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from 'layouts/auth.layout';
import { RegisterPayload } from 'auth/auth.types';
import { registerRestaurant } from 'api/request.api';
import { useModal, Modal } from 'common/components/modal';
import { registerValidationSchema } from 'auth/auth.validation';

const initialValues: RegisterPayload = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const { t } = useTranslation();
  const registerModal = useModal(true);

  const at = (text: string) => t(`auth.${text}`);

  return (
    <AuthLayout>
      <Modal title='Register Restaurant' {...registerModal.props}>
        <Formik
          validateOnBlur
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={async (values, actions) => {
            const { data, error } = await registerRestaurant(values);
            if (error || !data) {
              actions.setFieldError('confirmPassword', error?.message || at('SOMETHING_WENT_WRONG'));
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => {
            return <RegisterForm props={props} />;
          }}
        </Formik>
        <div className='text-center mt-4'>
          <Link to='/login' className='primary-link text-primary '>
            {at('ALREADY_HAVE_ACCOUNT')}
          </Link>
        </div>
      </Modal>
    </AuthLayout>
  );
};

export default Register;
