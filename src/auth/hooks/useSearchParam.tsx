import { useLocation } from 'react-router-dom';

const useSearchParam = (key: string) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  return params.get(key);
};

export default useSearchParam;
