import React, { FC, MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { ButtonGroupMui } from './FilterTodo.styled';
import { StatusTodo } from '../../types/todo.types';

const FilterTodo: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') ?? '';

  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    if ('name' in event.target) {
      searchParams.delete('page');
      const newStatus = String(event.target.name);
      if (newStatus !== StatusTodo.All) {
        searchParams.set('status', newStatus);
      } else {
        searchParams.delete('status');
      }
      setSearchParams(searchParams);
    }
  };

  return (
    <ButtonGroupMui>
      <Button
        onClick={handleOnClick}
        name={StatusTodo.All}
        variant={
          status === StatusTodo.Empty || status === StatusTodo.All ? 'contained' : 'outlined'
        }
      >
        All
      </Button>
      <Button
        onClick={handleOnClick}
        name={StatusTodo.Private}
        variant={status === StatusTodo.Private ? 'contained' : 'outlined'}
      >
        Private
      </Button>
      <Button
        onClick={handleOnClick}
        name={StatusTodo.Public}
        variant={status === StatusTodo.Public ? 'contained' : 'outlined'}
      >
        Public
      </Button>
      <Button
        onClick={handleOnClick}
        name={StatusTodo.Completed}
        variant={status === StatusTodo.Completed ? 'contained' : 'outlined'}
      >
        Completed
      </Button>
    </ButtonGroupMui>
  );
};

export default FilterTodo;
