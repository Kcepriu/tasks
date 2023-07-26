import { useMutation, useQueryClient } from 'react-query';
import httpServises from '../service/http';
import { ITodosWithCount } from '../common/types/todo.types';

const useDeleteTodo = (key_operation: string) => {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, isLoading } = useMutation(
    (id: string) => httpServises.deleteTodo(id),
    {
      onSuccess: (idDeleteTodo: string | null) => {
        queryClient.setQueryData<ITodosWithCount | undefined>(key_operation, (oldData) => {
          if (!oldData || 'pageParams' in oldData) {
            queryClient.invalidateQueries(key_operation, {
              exact: true,
              refetchActive: true,
              refetchInactive: true
            });
            return;
          }

          const { todos, totalCount } = oldData;
          const newTodos = todos.filter((oldTodo) => String(oldTodo.id) !== idDeleteTodo);
          const newTotalCount = totalCount - 1;

          return { todos: newTodos, totalCount: newTotalCount };
        });
      }
    }
  );

  return { mutate, isSuccess, isError, isLoading };
};

export default useDeleteTodo;
