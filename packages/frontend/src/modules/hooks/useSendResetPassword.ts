import { useMutation } from 'react-query';
import httpServises from '../service/http';
import { IRequestUser } from '../common/types/user.types';
import { showErrorMessage, showSuccessMessage } from '../helpers/message';
import { IResponseErr } from '../common/types/responseServer.types';

const useSendResetPassword = () => {
  const { mutate, isSuccess, isError, isLoading } = useMutation(
    (params: IRequestUser) => httpServises.sendResetPassword(params),
    {
      onSuccess: (message: string) => {
        showSuccessMessage(message);
      },
      onError: (res: IResponseErr) => {
        showErrorMessage(res.response.data.message);
      }
    }
  );

  return { mutate, isSuccess, isError, isLoading };
};

export default useSendResetPassword;
