import { subscription } from './auth-context.types';
import { SubscriptionDetail } from './auth.types';

export const setSubscriptionDetail = (subscriptionDetail?: SubscriptionDetail) => {
  return {
    type: subscription.SET_SUBSCRIPTION_DETAIL,
    payload: {
      subscriptionDetail,
    },
  };
};
