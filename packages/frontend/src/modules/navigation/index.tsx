import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import PrivateRoute from '../common/components/PrivateRoute/PrivateRoute';
import RestrictedRoute from '../common/components/RestrictedRoute/RestrictedRoute';
import MainLayout from '../layouts/MainLayout/MainLayout';
import ResetPassword from '../common/components/ResetPassword/ResetPassword';
import VerifyEmail from '../common/components/VerifyEmail/VerifyEmail';
import Login from '../pages/Login/Login.page';
import Todo from '../pages/Todo/Todo.page';
import Todos from '../pages/Todos/Todos.page';
import Registration from '../pages/Registration/Registration.page';
import Profile from '../pages/Profile/Profile.page';
import Home from '../pages/Home/Home.page';
import NotFound from '../pages/NotFound/NotFound.page';
import ForgetPassword from '../pages/ForgetPassword/ForgetPassword.page';

import useAuth from '../hooks/useAuth';
import MainLoader from '../common/components/MainLoader/MainLoader.component';

export const MainRouter: FC = () => {
  const { isLoading } = useAuth();

  if (isLoading) return <MainLoader />;

  return (
    <Routes>
      <Route path={APP_KEYS.ROUTER_KEYS.ROOT} element={<MainLayout />}>
        <Route index element={<RestrictedRoute component={Home} />} />
        {/* Private Routes */}
        <Route path={APP_KEYS.ROUTER_KEYS.TODO} element={<PrivateRoute component={Todos} />} />
        <Route path={APP_KEYS.ROUTER_KEYS.ONE_TODO} element={<PrivateRoute component={Todo} />} />
        <Route path={APP_KEYS.ROUTER_KEYS.PROFILE} element={<PrivateRoute component={Profile} />} />
        {/* Restricted Routes */}
        <Route
          path={APP_KEYS.ROUTER_KEYS.FORGET_PASSWORD}
          element={<RestrictedRoute component={ForgetPassword} />}
        />
        <Route path={APP_KEYS.ROUTER_KEYS.LOGIN} element={<RestrictedRoute component={Login} />} />
        <Route
          path={APP_KEYS.ROUTER_KEYS.REGISTRATION}
          element={<RestrictedRoute component={Registration} />}
        />
        {/* Services routes */}
        <Route
          path={APP_KEYS.ROUTER_KEYS.VERIFY}
          element={<RestrictedRoute component={VerifyEmail} />}
        />
        <Route
          path={APP_KEYS.ROUTER_KEYS.RESET}
          element={<RestrictedRoute component={ResetPassword} />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
