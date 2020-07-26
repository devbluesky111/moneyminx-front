import React from 'react';
import Input from 'common/components/input/text.input';
import SubmitButton from 'common/components';
import { useTranslation } from 'react-i18next';
import { LoginPayload, LoginFormProps } from 'auth/auth.types';

const LoginForm: React.FC<LoginFormProps> = ({ props }) => {
  const { t } = useTranslation();

  const at = (text: string) => t(`auth.${text}`);

  const error = (field: keyof LoginPayload) =>
    props.touched[field] && props.values[field] && props.errors[field] ? props.errors[field] : undefined;

  const fieldInfo = (field: keyof LoginPayload) => {
    return {
      email: at('EMAIL_HELP_TEXT'),
      password: at('PASSWORD_HELP_TEXT'),
    }[field];
  };

  const helpText = (field: keyof LoginPayload) => {
    return error(field) ? error(field) : fieldInfo(field);
  };

  const isValid = () => props.isValid && Object.values(props.values).some(Boolean);
  return (
    <form onSubmit={props.handleSubmit}>
      <Input
        title={at('EMAIL')}
        name='email'
        type='email'
        placeholder={at('ENTER_EMAIL')}
        error={!!error('email')}
        helperText={helpText('email')}
        handleChange={props.handleChange}
        handleOnBlur={props.handleBlur}
      />
      <Input
        name='password'
        type='password'
        title={at('PASSWORD')}
        helperText={helpText('password')}
        placeholder={at('ENTER_PASSWORD')}
        error={!!error('password')}
        handleOnBlur={props.handleBlur}
        handleChange={props.handleChange}
      />
      <SubmitButton loading={props.isSubmitting} text={at('LOGIN')} disabled={!isValid()} />
    </form>
  );
};

export default LoginForm;
