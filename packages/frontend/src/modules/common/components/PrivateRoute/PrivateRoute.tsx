import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { APP_KEYS } from '../../consts';

interface IParam {
  component: FC;
  redirectTo?: string;
}

const PrivateRoute: FC<IParam> = ({
  component: Component,
  redirectTo = APP_KEYS.ROUTER_KEYS.LOGIN
}) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Component /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
