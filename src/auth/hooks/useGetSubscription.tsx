import useFetch from 'common/hooks/useFetch';
import { getSubscription } from 'api/request.api';

const useGetSubscription = () => {
  const { res, loading } = useFetch(getSubscription, {});
  return { fetchingSubscription: loading, subscription: res?.data, subError: res?.error };
};

export default useGetSubscription;
