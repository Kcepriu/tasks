import React, { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import MainLoader from '../../common/components/MainLoader/MainLoader.component';
import { Container } from './MainLayout.styled';

const MainLayout: FC = () => (
  <Container>
    <Suspense fallback={<MainLoader />}>
      <Outlet />
    </Suspense>
  </Container>
);

export default MainLayout;
