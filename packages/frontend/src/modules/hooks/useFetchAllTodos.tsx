import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import httpServises from '../service/http';
import { IParamsTodo } from '../common/types/todo.types';
import { IResponseErr } from '../common/types/responseServer.types';
import useLogout from './useLogout';

const useFetchAllTodos = (key_operation: string) => {
  const [searchParams] = useSearchParams();
  const params = {} as IParamsTodo;
  const { mutate: logout } = useLogout();

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  const { data, isError, isLoading, isFetching } = useQuery(
    key_operation,
    () => httpServises.fetchAllTodos(params),
    {
      onError: (res: IResponseErr) => {
        if (res.response.data.code === 401) {
          logout();
        }
      }
    }
  );

  return { data, isError, isLoading, isFetching };
};

export default useFetchAllTodos;
