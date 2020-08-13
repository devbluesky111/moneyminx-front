import { makeTypes } from 'common/common-helper';

export const auth = {
  ...makeTypes('LOGIN'),
  ...makeTypes('SIGN_OUT'),
  ...makeTypes('PROFILE_COMPLETE'),
};
