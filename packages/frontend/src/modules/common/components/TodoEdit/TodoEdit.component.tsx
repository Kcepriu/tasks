import React, { FC, useEffect } from 'react';

import { Switch, Box } from '@mui/material';
import { useFormik } from 'formik';

import { ITodo, emptyTodo } from '../../types/todo.types';
import MainLoader from '../MainLoader/MainLoader.component';
import useCreateTodo from '../../../hooks/useCreateTodo';
import useUpdateTodo from '../../../hooks/useUpdateTodo';
import { showErrorMessage } from '../../../helpers/message';
import {
  WraperPage,
  Title,
  Description,
  Caption,
  ButtonBack,
  CaptionCheckbox,
  WrapStatus,
  WrapDescription
} from './TodoEdit.styled';
import { validationSchema } from './TodoEdit.schema';

interface IProps {
  editTodo: ITodo | null;
  keyOperation: string[];
  handleClose: () => void;
}
export interface ITodoWithoutId extends Omit<ITodo, 'id'> {}

const TodoEdit: FC<IProps> = ({ editTodo, keyOperation, handleClose }) => {
  const todo = editTodo === null ? { ...emptyTodo } : { ...editTodo };

  const {
    mutate: mutationCreateTodo,
    isSuccess: isSuccessCreate,
    isError: isErrorCreate,
    isLoading: isLoadingCreate
  } = useCreateTodo(keyOperation[0]);

  const {
    mutate: mutationUpdateTodo,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    isLoading: isLoadingUpdate
  } = useUpdateTodo(keyOperation);

  useEffect(() => {
    if (isSuccessCreate || isSuccessUpdate) handleClose();
  }, [isSuccessCreate, isSuccessUpdate]);

  useEffect(() => {
    if (isErrorCreate || isErrorUpdate) showErrorMessage('Error save');
  }, [isErrorCreate, isErrorUpdate]);

  const handleOnSubmin = async (values: ITodoWithoutId) => {
    const newTodo = { ...todo, ...values };

    if (newTodo.id) {
      mutationUpdateTodo({ id: newTodo.id, newTodo });
    } else {
      mutationCreateTodo(newTodo);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      private: todo.private
    },
    validationSchema,
    onSubmit: handleOnSubmin
  });

  return (
    <>
      <Box>
        <WraperPage>
          <Caption variant="h5">Title:</Caption>

          <form onSubmit={formik.handleSubmit}>
            <WrapDescription>
              <Title
                id="title"
                name="title"
                label="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                required
              />
            </WrapDescription>

            <Caption variant="h5">Description:</Caption>

            <WrapDescription>
              <Description
                rows={5}
                multiline
                id="description"
                name="description"
                label="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                required
              />
            </WrapDescription>

            <WrapStatus>
              <CaptionCheckbox variant="h5">Complete:</CaptionCheckbox>
              <Switch
                id="completed"
                name="completed"
                checked={formik.values.completed}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </WrapStatus>

            <WrapStatus>
              <CaptionCheckbox variant="h5">Private:</CaptionCheckbox>
              <Switch
                id="private"
                name="private"
                checked={formik.values.private}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </WrapStatus>

            <WrapStatus>
              <ButtonBack variant="outlined" type="submit">
                Save
              </ButtonBack>

              <ButtonBack variant="outlined" onClick={handleClose}>
                Cancel
              </ButtonBack>
            </WrapStatus>
          </form>
        </WraperPage>
      </Box>
      {(isLoadingCreate || isLoadingUpdate) && <MainLoader />}
    </>
  );
};

export default TodoEdit;
