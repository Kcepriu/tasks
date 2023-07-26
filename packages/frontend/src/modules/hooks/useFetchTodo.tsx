import { useQuery } from 'react-query';
import httpServises from '../service/http';

const useFetchTodo = (key_operation: string, id: string) => {
  const { data, isError, isLoading } = useQuery(key_operation, () =>
    httpServises.fetchTodoById(id)
  );

  return { data, isError, isLoading };
};

export default useFetchTodo;
