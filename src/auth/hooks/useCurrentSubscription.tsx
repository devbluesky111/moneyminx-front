import { useEffect, useState } from 'react';

import { useAuthDispatch } from 'auth/auth.context';
import { ERequestStatus } from 'common/common.types';
import { ICurrentSubscription } from 'auth/auth.types';
import { getCurrentSubscription } from 'api/request.api';
import { setCurSubscription } from 'auth/auth.actions';

const useCurrentSubscription = () => {
  const dispatch = useAuthDispatch();
  const [state, setState] = useState<ERequestStatus>(ERequestStatus.INITIAL);
  const [currentSubscription, setCurrentSubscription] = useState<ICurrentSubscription>();

  useEffect(() => {
    (async () => {
      const { data, error } = await getCurrentSubscription();
      if (error || !data) {
        return setState(ERequestStatus.WITH_ERROR);
      }
      setState(ERequestStatus.WITH_DATA);
      dispatch(setCurSubscription(data));

      return setCurrentSubscription(data);
    })();
  }, [dispatch]);

  return {
    currentSubscription,
    fetchingCurrentSubscription: state === ERequestStatus.INITIAL || state === ERequestStatus.PROCESSING,
    currentSubError: state === ERequestStatus.WITH_ERROR ? 'Error on fetching current subscription' : null,
  };
};

export default useCurrentSubscription;
