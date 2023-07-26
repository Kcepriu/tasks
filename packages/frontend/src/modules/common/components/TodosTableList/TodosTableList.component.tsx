import React, { FC, useRef } from 'react';
import Slider from 'react-slick';
import ActionsBar from '../ActionsBar/ActionsBar.component';
import MainLoader from '../MainLoader/MainLoader.component';
import useFetchAllTodosInfinite from '../../../hooks/useFetchAllTodosInfinite';
import { Wrap, Card, Title, Caption, WrapDescription, Description } from './TodosTableList.styled';

interface Props {
  currentPage: number;
  countOnPage: number;
}

const settingsSlider = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const TodosTableList: FC<Props> = ({ currentPage, countOnPage }) => {
  const pageCurrentNumber = useRef(currentPage);

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

  const onAfterChange = (index: number) => {
    if (
      index + 1 >= pageCurrentNumber.current * countOnPage &&
      pageCurrentNumber.current * countOnPage < totalCountItems
    ) {
      pageCurrentNumber.current += 1;
      fetchNextPage({ pageParam: pageCurrentNumber.current });
    }
  };

  if (isLoading) return <MainLoader />;

  return (
    <Wrap>
      <Slider initialSlide={0} className="slider" afterChange={onAfterChange} {...settingsSlider}>
        {pages
          .map((page) =>
            page.todos.map((todo) => (
              <Card key={todo.id}>
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
                <ActionsBar todo={todo} />
              </Card>
            ))
          )
          .flat()}
      </Slider>
      {(isFetching || isFetchingNextPage) && <MainLoader />}
    </Wrap>
  );
};

export default TodosTableList;
