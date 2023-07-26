import { useMutation, useQueryClient } from 'react-query';
import httpServises from '../service/http';
import { QUERY_KEYS } from '../common/consts/app-keys.const';
import { IUser } from '../common/types/user.types';

const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError, isLoading } = useMutation(() => httpServises.logout(), {
    onSettled: () => {
      httpServises.setAuthHeader('');
      queryClient.setQueryData<IUser | null>(QUERY_KEYS.USER, null);
      queryClient.clear();
    }
  });

  return { mutate, isSuccess, isError, isLoading };
};

export default useLogout;
