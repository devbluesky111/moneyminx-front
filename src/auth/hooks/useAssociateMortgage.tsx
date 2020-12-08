import useFetch from 'common/hooks/useFetch';
import { MortgageList } from 'auth/auth.types';
import { getAssociateMortgage } from 'api/request.api';

const useAssociateMortgage = () => {
  const { res, loading } = useFetch(getAssociateMortgage, {});
  return { fetchingMortgage: loading, mortgageAccounts: res?.data as MortgageList, mortgageError: res?.error };
};

export default useAssociateMortgage;
