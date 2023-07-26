import { useMutation, useQueryClient } from 'react-query';
import httpServises from '../service/http';
import { ITodo } from '../common/types/todo.types';

const useCreateTodo = (key_operation: string) => {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, isLoading } = useMutation(
    (newTodo: ITodo) => httpServises.createTodo(newTodo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(key_operation, {
          exact: true,
          refetchActive: true,
          refetchInactive: true
        });
      }
    }
  );

  return { mutate, isSuccess, isError, isLoading };
};

export default useCreateTodo;
