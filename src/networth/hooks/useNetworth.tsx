import { useEffect, useState } from 'react';

import { getNetworth } from 'api/request.api';
import { useNetworthDispatch } from 'networth/networth.context';
import { NetworthParam, NetworthType } from 'networth/networth.type';
import { setAccounts, setNetWorth } from 'networth/networth.actions';

const useNetworth = (params?: NetworthParam) => {
  const dispatch = useNetworthDispatch();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<NetworthType>();

  const fromDate = params?.fromDate;
  const category = params?.timeInterval;
  const accountType = params?.accountType;
  const timeInterval = params?.timeInterval;

  useEffect(() => {
    const fetchNetworth = async () => {
      setLoading(true);
      const { data, error: networthError } = await getNetworth({ accountType, timeInterval, category, fromDate });

      if (networthError) {
        setLoading(false);

        return setError(networthError);
      }

      if (data?.networth) {
        dispatch(setNetWorth(data.networth));
      }

      if (data?.accounts) {
        dispatch(setAccounts(data.accounts));
      }

      setLoading(false);

      return setResponse(data);
    };

    fetchNetworth();
  }, [accountType, timeInterval, category, fromDate, dispatch]);

  return { loading, error, accounts: response?.accounts, networth: response?.networth };
};

export default useNetworth;
