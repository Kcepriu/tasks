import React, { FC, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Switch, Button } from '@mui/material';
import { APP_KEYS } from '../../consts';
import { ITodo } from '../../types/todo.types';
import useUpdateTodo from '../../../hooks/useUpdateTodo';
import useDeleteTodo from '../../../hooks/useDeleteTodo';
import { showErrorMessage } from '../../../helpers/message';
import MainLoader from '../MainLoader/MainLoader.component';

import { Wrap, WrapButton } from './ActionsBar.styled';

interface Props {
  todo: ITodo;
}

const ActionsBar: FC<Props> = ({ todo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const keyOperation = window.location.pathname + window.location.search;
  const keyOperationTodo = `/todo/${todo.id}`;

  const {
    mutate: mutationUpdateTodo,
    isError: isErrorUpdate,
    isLoading: isLoadingUpdate
  } = useUpdateTodo([keyOperation, keyOperationTodo]);

  const {
    mutate: mutationDeleteTodo,
    isError: isErrorDelete,
    isLoading: isLoadingDelete
  } = useDeleteTodo(keyOperation);

  const handleOpen = () => {
    navigate(`${APP_KEYS.ROUTER_KEYS.TODO}/${todo.id}`, { state: { from: location } });
  };

  const handleDelete = () => {
    mutationDeleteTodo(todo.id);
  };

  const handleChange = () => {
    const newTodo = { ...todo, completed: !todo.completed };
    mutationUpdateTodo({ id: newTodo.id, newTodo });
  };

  // * Use Effect
  useEffect(() => {
    if (isErrorUpdate) showErrorMessage('Error change todo');
    if (isErrorDelete) showErrorMessage('Error delete todo');
  }, [isErrorUpdate, isErrorDelete]);

  return (
    <>
      <Wrap>
        <WrapButton>
          <Button variant="contained" size="small" onClick={handleOpen}>
            View
          </Button>
          <Button variant="contained" size="small" onClick={handleDelete}>
            Delete
          </Button>
        </WrapButton>

        <Switch checked={todo.completed} onChange={handleChange} />
      </Wrap>
      {(isLoadingUpdate || isLoadingDelete) && <MainLoader />}
    </>
  );
};

export default ActionsBar;
