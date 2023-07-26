import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { useParams, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Switch, Modal } from '@mui/material';
import { APP_KEYS } from '../../common/consts';
import MainLoader from '../../common/components/MainLoader/MainLoader.component';
import TodoEdit from '../../common/components/TodoEdit/TodoEdit.component';
import { showErrorMessage } from '../../helpers/message';

import useFetchTodo from '../../hooks/useFetchTodo';
import useUpdateTodo from '../../hooks/useUpdateTodo';

import {
  WraperPage,
  Title,
  Description,
  Caption,
  ButtonBack,
  CaptionCheckbox,
  WrapStatus,
  WrapDescription,
  BoxModal
} from './Todo.style';

const Todo: FC = () => {
  const [openModel, setOpenModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? APP_KEYS.ROUTER_KEYS.TODO;
  const keyOperation = `/todo/${id}`;

  const keyPrevOperation = backLinkHref.pathname + backLinkHref.search;

  const { data: todo, isLoading, isError } = useFetchTodo(keyOperation, `${id}`);

  const {
    mutate: mutationUpdateTodo,
    isError: isErrorUpdate,
    isLoading: isLoadingUpdate
  } = useUpdateTodo([keyOperation, keyPrevOperation]);

  // * Use Effect
  useEffect(() => {
    if (isError) showErrorMessage('Error fetch todo');
  }, [isError]);

  useEffect(() => {
    if (isErrorUpdate) showErrorMessage('Error change todo');
  }, [isErrorUpdate]);

  // * Handle
  const handleBack = () => {
    navigate(backLinkHref);
  };

  const handleEdit = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nameField = event.target.name;

    if (todo && !!todo.id && (nameField === 'private' || nameField === 'completed')) {
      const newTodo = { ...todo, [nameField]: !todo[nameField] };
      mutationUpdateTodo({ id: newTodo.id, newTodo });
    }
  };
  // * Render
  if (isLoading) return <MainLoader />;
  if (!todo) return <Navigate to="/NotFound" replace />;

  return (
    <>
      <WraperPage>
        <Title variant="h3">{todo.title}</Title>
        <Caption variant="h5">Description:</Caption>

        <WrapDescription>
          <Description
            value={todo.description}
            rows={5}
            multiline
            variant="outlined"
            InputProps={{
              readOnly: true
            }}
          />
        </WrapDescription>

        <WrapStatus>
          <CaptionCheckbox variant="h5">Complete:</CaptionCheckbox>
          <Switch
            id="completed"
            name="completed"
            checked={todo.completed}
            onChange={handleChange}
          />
        </WrapStatus>

        <WrapStatus>
          <CaptionCheckbox variant="h5">Private:</CaptionCheckbox>
          <Switch id="private" name="private" checked={todo.private} onChange={handleChange} />
        </WrapStatus>

        <WrapStatus>
          <ButtonBack variant="outlined" onClick={handleBack}>
            Back
          </ButtonBack>

          <ButtonBack variant="outlined" onClick={handleEdit}>
            Edit
          </ButtonBack>
        </WrapStatus>
      </WraperPage>

      <Modal open={openModel} onClose={handleCloseModal}>
        <BoxModal>
          <TodoEdit
            editTodo={todo}
            keyOperation={[keyOperation, keyPrevOperation]}
            handleClose={handleCloseModal}
          />
        </BoxModal>
      </Modal>
      {isLoadingUpdate && <MainLoader />}
    </>
  );
};

export default Todo;
