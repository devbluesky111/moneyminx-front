import { ILoginResponse, SubscriptionDetail } from './auth.types';
import { auth, subscription } from './auth-context.types';

export const setSubscriptionDetail = (subscriptionDetail?: SubscriptionDetail) => {
  return {
    type: subscription.SET_SUBSCRIPTION_DETAIL,
    payload: {
      subscriptionDetail,
    },
  };
};

export const setLoginSuccess = (payload: ILoginResponse) => {
  return {
    type: auth.LOGIN_SUCCESS,
    payload,
  };
};
