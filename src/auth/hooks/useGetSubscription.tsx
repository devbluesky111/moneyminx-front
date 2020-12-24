import { useEffect, useState } from 'react';

import { getSubscription } from 'api/request.api';
import { useAuthDispatch } from 'auth/auth.context';
import { SubscriptionDetail } from 'auth/auth.types';
import { setSubscriptionDetail } from 'auth/auth.actions';

const useGetSubscription = (priceId?: string) => {
  const dispatch = useAuthDispatch();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<SubscriptionDetail>();
  const [subscriptions, setSubscriptions] = useState<SubscriptionDetail[]>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { error: apiError, data } = await getSubscription({ priceId });
      setLoading(false);
      if (apiError || !data) {
        return setError(apiError);
      }

      if (priceId) {
        const subscriptionDetail: SubscriptionDetail = data;
        setSubscription(subscriptionDetail);

        return dispatch(setSubscriptionDetail(subscriptionDetail));
      }

      setSubscriptions(data);
      const [subDetail]: SubscriptionDetail[] = data;
      setSubscription(subDetail);

      return dispatch(setSubscriptionDetail(subDetail));
    })();
  }, [dispatch, priceId]);

  return {
    subError: error,
    fetchingSubscription: loading,
    subscription: subscriptions,
    subscriptionDetail: subscription,
  };
};

export default useGetSubscription;
