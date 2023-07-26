import React, { FC, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSearchParams } from 'react-router-dom';
import { Modal } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import NavigationTodo from '../../common/components/NavigationTodo/NavigationTodo.component';
import FilterTodo from '../../common/components/FilterTodo/FilterTodo.component';
import SearchTodo from '../../common/components/SearchTodo/SearchTodo.components';

import TodosDesktopList from '../../common/components/TodosDesktopList/TodosDesktopList.component';
import TodosMobileList from '../../common/components/TodosMobileList/TodosMobileList.component';
import TodosTableList from '../../common/components/TodosTableList/TodosTableList.component';
import TodoEdit from '../../common/components/TodoEdit/TodoEdit.component';

import { BREAKPOINT_NUMBER } from '../../theme';

import { WrapPage, WrapFilterSearch, WrapTodos, ButtonAddTodo, BoxModal } from './Todos.styled';

const getCurrentPage = (page: string | null, countOnPage: number): number => {
  let normalNumPage = Number(page || 1);
  normalNumPage = normalNumPage > countOnPage ? countOnPage : normalNumPage;
  return normalNumPage;
};

const Todos: FC = () => {
  const countOnPage = 3;

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = getCurrentPage(searchParams.get('page'), countOnPage);
  const limit = searchParams.get('limit') || 0;

  const [openModal, setOpenModal] = useState(false);

  const keyOperation = window.location.pathname + window.location.search;

  const isDesktop = useMediaQuery({ minWidth: BREAKPOINT_NUMBER.desktop });

  const isTablet = useMediaQuery({
    minWidth: BREAKPOINT_NUMBER.tablet,
    maxWidth: BREAKPOINT_NUMBER.desktop - 1
  });

  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT_NUMBER.tablet - 1 });
  useEffect(() => {
    if (Number(limit) === countOnPage) return;
    searchParams.set('limit', String(countOnPage));
    setSearchParams(searchParams);
  }, []);

  // *  Handles
  const handleCreateTodo = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSetPage = (numPage: number) => {
    searchParams.set('page', String(numPage));
    searchParams.set('limit', String(countOnPage));
    setSearchParams(searchParams);
  };

  return (
    <WrapPage>
      <ButtonAddTodo onClick={handleCreateTodo}>
        <ControlPointIcon color="primary" fontSize="large" />
      </ButtonAddTodo>
      <NavigationTodo />
      <WrapFilterSearch>
        <FilterTodo />
        <SearchTodo />
      </WrapFilterSearch>

      <WrapTodos>
        {isDesktop && (
          <TodosDesktopList
            currentPage={currentPage}
            countOnPage={countOnPage}
            handleSetPage={handleSetPage}
          />
        )}
        {isTablet && <TodosTableList currentPage={currentPage} countOnPage={countOnPage} />}
        {isMobile && <TodosMobileList currentPage={currentPage} countOnPage={countOnPage} />}
      </WrapTodos>

      <Modal open={openModal} onClose={handleCloseModal}>
        <BoxModal>
          <TodoEdit editTodo={null} keyOperation={[keyOperation]} handleClose={handleCloseModal} />
        </BoxModal>
      </Modal>
    </WrapPage>
  );
};

export default Todos;
