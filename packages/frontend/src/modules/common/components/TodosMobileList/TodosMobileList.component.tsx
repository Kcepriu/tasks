import React, { FC, useRef, useEffect } from 'react';
import { InView } from 'react-intersection-observer';
import { useQueryClient } from 'react-query';
import MainLoader from '../MainLoader/MainLoader.component';
import ActionsBar from '../ActionsBar/ActionsBar.component';
import { Wrap, Title, Description, WrapCard } from './TodosMobileList.styled';
import useFetchAllTodosInfinite from '../../../hooks/useFetchAllTodosInfinite';

interface Props {
  currentPage: number;
  countOnPage: number;
}

const TodosMobileList: FC<Props> = ({ currentPage, countOnPage }) => {
  const pageCurrentNumber = useRef(currentPage);

  const queryClient = useQueryClient();

  const keyOperation = window.location.pathname + window.location.search;
  const {
    data,
    totalCountItems,
    pageCurrentNumberFetch,
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage
  } = useFetchAllTodosInfinite(keyOperation);

  const pages = !data ? [] : data.pages;

  if (pageCurrentNumber.current < pageCurrentNumberFetch) {
    pageCurrentNumber.current = pageCurrentNumberFetch;
  }

  const autoLoad = (inView: boolean) => {
    if (inView && pageCurrentNumber.current * countOnPage < totalCountItems) {
      pageCurrentNumber.current += 1;
      fetchNextPage({ pageParam: pageCurrentNumber.current });
    }
  };

  useEffect(
    () => () => {
      queryClient.invalidateQueries(keyOperation);
    },
    []
  );

  if (isLoading) return <MainLoader />;

  return (
    <Wrap>
      {pages
        .map((page) =>
          page.todos.map((todo) => (
            <WrapCard key={todo.id}>
              <Title>{todo.title}</Title>
              <Description>{todo.description}</Description>
              <ActionsBar todo={todo} />
            </WrapCard>
          ))
        )
        .flat()}
      <InView
        onChange={(inView) => {
          autoLoad(inView);
        }}
      />
      {(isFetching || isFetchingNextPage) && <MainLoader />}
    </Wrap>
  );
};

export default TodosMobileList;
