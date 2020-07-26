import React from 'react';
import Input from 'common/components/input/text.input';
import SubmitButton from 'common/components';
import { useTranslation } from 'react-i18next';
import { RegisterFormProps, RegisterPayload } from 'auth/auth.types';

const RegisterForm: React.FC<RegisterFormProps> = ({ props }) => {
  const { t } = useTranslation();

  const at = (text: string) => t(`auth.${text}`);

  const error = (field: keyof RegisterPayload) =>
    props.touched[field] && props.values[field] && props.errors[field] ? props.errors[field] : undefined;

  const helpText = (field: keyof RegisterPayload) => {
    return error(field) ? error(field) : '';
  };

  const isValid = () => props.isValid && Object.values(props.values).some(Boolean);
  return (
    <form onSubmit={props.handleSubmit}>
      <Input
        name='name'
        type='text'
        error={!!error('name')}
        title={at('RESTAURANT_NAME')}
        helperText={helpText('name')}
        handleOnBlur={props.handleBlur}
        handleChange={props.handleChange}
        placeholder={at('ENTER_RESTAURANT_NAME')}
      />
      <Input
        name='email'
        type='email'
        title={at('EMAIL')}
        error={!!error('email')}
        helperText={helpText('email')}
        placeholder={at('ENTER_EMAIL')}
        handleOnBlur={props.handleBlur}
        handleChange={props.handleChange}
      />
      <Input
        name='password'
        type='password'
        title={at('PASSWORD')}
        error={!!error('password')}
        handleOnBlur={props.handleBlur}
        helperText={helpText('password')}
        handleChange={props.handleChange}
        placeholder={at('ENTER_PASSWORD')}
      />
      <Input
        type='password'
        name='confirmPassword'
        title={at('CONFIRM_PASSWORD')}
        handleOnBlur={props.handleBlur}
        handleChange={props.handleChange}
        error={!!error('confirmPassword')}
        placeholder={at('CONFIRM_PASSWORD')}
        helperText={helpText('confirmPassword')}
      />
      <SubmitButton loading={props.isSubmitting} text={at('REGISTER')} disabled={!isValid()} />
    </form>
  );
};

export default RegisterForm;
