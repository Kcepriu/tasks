import { useQuery } from 'react-query';
import httpServises from '../service/http';
import { QUERY_KEYS } from '../common/consts/app-keys.const';

const useAuth = () => {
  const { data, isLoading } = useQuery(QUERY_KEYS.USER, () => httpServises.getCurrentUser(), {
    retry: 1,
    onError: () => {
      httpServises.setAuthHeader('');
    }
  });

  const isLoggedIn = !!data;

  return { isLoggedIn, data, isLoading };
};

export default useAuth;
