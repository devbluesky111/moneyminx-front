import { SubscriptionDetail } from './auth.types';
import { subscription } from './auth-context.types';

export const setSubscriptionDetail = (subscriptionDetail?: SubscriptionDetail) => {
  return {
    type: subscription.SET_SUBSCRIPTION_DETAIL,
    payload: {
      subscriptionDetail,
    },
  };
};
