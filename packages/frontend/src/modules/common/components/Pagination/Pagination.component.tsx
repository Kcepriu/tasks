import React, { FC } from 'react';
import { Pagination as PaginationMUI } from '@mui/material';

interface IProps {
  currentPage: number;
  countPage: number;
  handleSetPage: (numPage: number) => void;
}
const Pagination: FC<IProps> = ({ currentPage, countPage, handleSetPage }) => (
  <div>
    <PaginationMUI
      count={countPage}
      page={currentPage}
      color="primary"
      shape="rounded"
      onChange={(_, page) => handleSetPage(page)}
    />
  </div>
);

export default Pagination;
