import React, { FC, FormEvent } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';

const SearchTodo: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const newSearch = (form.elements.namedItem('search') as HTMLInputElement).value;
    searchParams.delete('page');
    if (newSearch) {
      searchParams.set('search', newSearch);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="search"
          label="Search"
          defaultValue={search}
          size="small"
          // defaultValue="Default Value"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </form>
    </div>
  );
};

export default SearchTodo;
