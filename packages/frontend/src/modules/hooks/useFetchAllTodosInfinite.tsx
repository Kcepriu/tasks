import { useInfiniteQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import httpServises from '../service/http';
import { IParamsTodo, ITodosWithCount } from '../common/types/todo.types';
import { IResponseErr } from '../common/types/responseServer.types';
import useLogout from './useLogout';

const useFetchAllTodosInfinite = (key_operation: string) => {
  const [searchParams] = useSearchParams();

  const params = {} as IParamsTodo;
  const { mutate: logout } = useLogout();

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  const fetchData = async (myParams: IParamsTodo, currentPage = 1) => {
    const result = await httpServises.fetchAllTodos(myParams);
    result.currentPage = currentPage;
    return result;
  };

  const fetchItems = (pageParam = 1) => {
    params.page = String(pageParam) || '1';
    return fetchData(params, pageParam);
  };

  const { data, isError, isLoading, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<ITodosWithCount, IResponseErr>(
      key_operation,
      ({ pageParam = 1 }) => fetchItems(pageParam),
      {
        onError: (res: IResponseErr) => {
          if (res.response.data.code === 401) {
            logout();
          }
        }
      }
    );

  const pages = !data ? [] : data.pages;
  const totalCountItems = pages.length > 0 ? pages[0].totalCount : 0;
  const pageCurrentNumberFetch = (pages.length > 0 ? pages[pages.length - 1].currentPage : 0) ?? 0;

  return {
    data,
    totalCountItems,
    pageCurrentNumberFetch,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage
  };
};

export default useFetchAllTodosInfinite;
