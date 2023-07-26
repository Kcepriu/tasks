import { useMutation, useQueryClient } from 'react-query';
import httpServises from '../service/http';
import { ITodo } from '../common/types/todo.types';

interface IParametr {
  id: string;
  newTodo: ITodo;
}

const useUpdateTodo = (array_key_operation: string[]) => {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, isLoading } = useMutation(
    ({ id, newTodo }: IParametr) => httpServises.updateTodo(id, newTodo),
    {
      onSuccess: () => {
        array_key_operation.forEach((key_operation) => {
          queryClient.invalidateQueries(key_operation, {
            exact: true,
            refetchActive: true,
            refetchInactive: true
          });
        });
      }
    }
  );

  return { mutate, isSuccess, isError, isLoading };
};

export default useUpdateTodo;
