import React, { FC } from 'react';
import { Bars } from 'react-loader-spinner';
import { createPortal } from 'react-dom';
import { Wrap } from './MainLoader.styled';

const modalRoot = document.querySelector('#modal-root');

const MainLoader: FC = () => {
  if (!modalRoot) return <>...Loading</>;

  return createPortal(
    <Wrap>
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Wrap>,
    modalRoot
  );
};

export default MainLoader;
