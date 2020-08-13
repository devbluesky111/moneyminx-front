import * as Yup from 'yup';
import validation from 'lang/en/validation.json';

const { REQUIRED_FIELD, INVALID_EMAIL, INVALID_PASSWORD_LENGTH, PASSWORD_ERROR, PASSWORD_MATCH } = validation;

export const loginValidationSchema = Yup.object({
  email: Yup.string().email(INVALID_EMAIL).required(REQUIRED_FIELD),
  password: Yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d{2,})(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, PASSWORD_ERROR)
    .required(REQUIRED_FIELD),
});

export const registerValidationSchema = Yup.object({
  name: Yup.string().required(REQUIRED_FIELD),
  email: Yup.string().email(INVALID_EMAIL).required(REQUIRED_FIELD),
  password: Yup.string()
    .min(8, INVALID_PASSWORD_LENGTH)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, PASSWORD_ERROR)
    .required(REQUIRED_FIELD),
  confirmPassword: Yup.string()
    .required(REQUIRED_FIELD)
    .oneOf([Yup.ref('password'), null], PASSWORD_MATCH),
});
