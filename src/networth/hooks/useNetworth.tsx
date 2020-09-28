import { useEffect, useState } from 'react';

import { getNetworth } from 'api/request.api';
import { NetworthParam, NetworthType } from 'networth/networth.type';

const useNetworth = (params?: NetworthParam) => {
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

      setLoading(false);

      return setResponse(data);
    };

    fetchNetworth();
  }, [accountType, timeInterval, category, fromDate]);

  return { loading, error, accounts: response?.accounts, networth: response?.networth };
};

export default useNetworth;
