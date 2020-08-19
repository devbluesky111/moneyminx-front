import * as Yup from 'yup';
import validation from 'lang/en/validation.json';

const { REQUIRED_FIELD, INVALID_EMAIL, PASSWORD_ERROR, FORGOT_TERMS } = validation;

export const loginValidationSchema = Yup.object({
  email: Yup.string().email(INVALID_EMAIL).required(REQUIRED_FIELD),
  password: Yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d{2,})(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, PASSWORD_ERROR)
    .required(REQUIRED_FIELD),
});

export const registerValidationSchema = Yup.object({
  email: Yup.string().email(INVALID_EMAIL).required(REQUIRED_FIELD),
  password: Yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d{2,})(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, PASSWORD_ERROR)
    .required(REQUIRED_FIELD),
  termsAccepted: Yup.bool().oneOf([true], FORGOT_TERMS),
});
