import React, { FC, useEffect } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ActionsBar from '../ActionsBar/ActionsBar.component';
import Pagination from '../Pagination/Pagination.component';
import { TableContainerMUI, Warap } from './TodosDesktopList.styled';
import useFetchAllTodos from '../../../hooks/useFetchAllTodos';
import MainLoader from '../MainLoader/MainLoader.component';
import { showErrorMessage } from '../../../helpers/message';

interface Props {
  currentPage: number;
  countOnPage: number;
  handleSetPage: (numPage: number) => void;
}

const TodosDesktopList: FC<Props> = ({ currentPage, countOnPage, handleSetPage }) => {
  const keyOperation = window.location.pathname + window.location.search;

  const { data, isLoading, isError, isFetching } = useFetchAllTodos(keyOperation);

  const countPage = !data ? 0 : Math.ceil(data.totalCount / countOnPage);
  const todos = !data ? [] : data.todos;

  useEffect(() => {
    if (isError) showErrorMessage('Error fetch todo');
  }, [isError]);

  if (isLoading) return <MainLoader />;

  return (
    <Warap>
      <TableContainerMUI>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: '200px' }}>Todo title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell sx={{ minWidth: '200px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>
                  <ActionsBar todo={todo} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerMUI>
      <Pagination currentPage={currentPage} countPage={countPage} handleSetPage={handleSetPage} />
      {isFetching && <MainLoader />}
    </Warap>
  );
};

export default TodosDesktopList;
