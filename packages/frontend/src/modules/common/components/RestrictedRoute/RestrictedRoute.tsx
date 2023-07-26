import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { APP_KEYS } from '../../consts';

interface IParam {
  component: FC;
  redirectTo?: string;
}

const RestrictedRoute: FC<IParam> = ({
  component: Component,
  redirectTo = APP_KEYS.ROUTER_KEYS.TODO
}: IParam) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};

export default RestrictedRoute;
