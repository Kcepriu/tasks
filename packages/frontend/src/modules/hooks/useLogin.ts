import { useMutation, useQueryClient } from 'react-query';
import httpServises from '../service/http';
import { QUERY_KEYS } from '../common/consts/app-keys.const';
import { IRequestUser, IUser } from '../common/types/user.types';
import { showErrorMessage } from '../helpers/message';
import { IResponseErr } from '../common/types/responseServer.types';

const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError, isLoading } = useMutation(
    (params: IRequestUser) => httpServises.login(params),
    {
      onSuccess: (user: IUser) => {
        queryClient.setQueryData<IUser | null>(QUERY_KEYS.USER, user);
        httpServises.setAuthHeader(user.accessToken || '');
      },
      onError: (res: IResponseErr) => {
        showErrorMessage(res.response.data.message);
      }
    }
  );

  return { mutate, isSuccess, isError, isLoading };
};

export default useLogin;
