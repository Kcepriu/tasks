import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import useVerify from '../../../hooks/useVerify';
import MainLoader from '../MainLoader/MainLoader.component';
import { APP_KEYS } from '../../consts';

const VerifyEmail: FC = () => {
  const { isLoading } = useVerify();
  if (isLoading) return <MainLoader />;

  // refetch({ stale: true });

  return <Navigate to={APP_KEYS.ROUTER_KEYS.ROOT} />;
};

export default VerifyEmail;
