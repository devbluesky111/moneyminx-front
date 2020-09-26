import { getNetworth } from 'api/request.api';
import { AccountCategory } from 'networth/networth.enum';
import { useEffect, useState } from 'react';

interface NetworthType {
  accounts: Record<AccountCategory, any[]>;
  networth: any[];
}

const useNetworth = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<NetworthType>();

  useEffect(() => {
    const fetchNetworth = async () => {
      setLoading(true);
      const { data, error: networthError } = await getNetworth();

      if (networthError) {
        setLoading(false);

        return setError(networthError);
      }

      setLoading(false);

      return setResponse(data);
    };

    fetchNetworth();
  }, []);

  return { loading, error, accounts: response?.accounts, networth: response?.networth };
};

export default useNetworth;
