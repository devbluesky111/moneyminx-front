import { makeTypes } from 'common/common-helper';

export const auth = {
  ...makeTypes('LOGIN'),
  ...makeTypes('REGISTER'),
  ...makeTypes('SIGN_OUT'),
  ...makeTypes('PROFILE_COMPLETE'),
  ...makeTypes('PROFILE_REFRESH'),
};
