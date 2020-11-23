import { useEffect } from 'react';

import useFetch from 'common/hooks/useFetch';
import { getSubscription } from 'api/request.api';
import { useAuthDispatch } from 'auth/auth.context';
import { SubscriptionDetail } from 'auth/auth.types';
import { setSubscriptionDetail } from 'auth/auth.actions';

const useGetSubscription = (priceId?: string) => {
  const dispatch = useAuthDispatch();
  const { res, loading } = useFetch(getSubscription, { priceId });

  useEffect(() => {
    if (res?.data && priceId) {
      const subscriptionDetail: SubscriptionDetail = res.data;
      if (subscriptionDetail) {
        dispatch(setSubscriptionDetail(subscriptionDetail));
      }
    }
  }, [dispatch, res, priceId]);

  return { fetchingSubscription: loading, subscription: res?.data, subError: res?.error };
};

export default useGetSubscription;
