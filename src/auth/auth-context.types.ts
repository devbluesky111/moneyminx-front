import { makeTypes } from 'common/common-helper';

export const auth = {
  ...makeTypes('SIGN_IN'),
  ...makeTypes('SIGN_OUT'),
  ...makeTypes('PROFILE_COMPLETE'),
};
