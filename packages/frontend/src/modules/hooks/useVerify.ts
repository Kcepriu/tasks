import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import httpServises from '../service/http';
import { QUERY_KEYS } from '../common/consts/app-keys.const';
import { IUser } from '../common/types/user.types';
import { showErrorMessage } from '../helpers/message';
import { IResponseErr } from '../common/types/responseServer.types';

const useVerify = () => {
  const { token } = useParams();

  const queryClient = useQueryClient();
  const { isLoading, isSuccess, isError } = useQuery(
    QUERY_KEYS.USER,
    () => httpServises.verify(token || ''),
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

  return { isSuccess, isLoading, isError };
};

export default useVerify;
