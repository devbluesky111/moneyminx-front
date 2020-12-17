import { auth, subscription } from './auth-context.types';
import { Account, ILoginResponse, SubscriptionDetail } from './auth.types';

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

/**
 * @param data
 * @description we will filter out to have fresh accounts by whether the account is being overridden or not.
 */
export const setAccountSuccess = (data: Account[]) => {
  const freshAccounts = data?.filter((acc) => !acc.accountDetails.overridden);

  return {
    type: auth.FETCH_ACCOUNT_SUCCESS,
    payload: { user: freshAccounts },
  };
};
