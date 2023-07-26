import React, { FC } from 'react';
import { useFormik } from 'formik';

import { Button, TextField } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import { APP_KEYS } from '../../consts';
import { IRequestUser } from '../../types/user.types';
import MainLoader from '../MainLoader/MainLoader.component';
import { Wrap, Form, WrapButton } from './ResetPassword.styled';
import useResetPassword from '../../../hooks/useResetPassword';
import { validationSchema } from './ResetPassword.schema';

const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const { mutate: resetPassword, isLoading, isSuccess } = useResetPassword();

  const handleSubmit = async (values: IRequestUser) => {
    resetPassword(values);
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: handleSubmit
  });

  if (isSuccess) return <Navigate to={APP_KEYS.ROUTER_KEYS.ROOT} />;

  return (
    <Wrap>
      <Form onSubmit={formik.handleSubmit}>
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
        />

        <TextField
          id="confirmPassword"
          name="confirmPassword"
          label="Password confirmation"
          value={formik.values.confirmPassword}
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          required
        />
        <WrapButton>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate(APP_KEYS.ROUTER_KEYS.ROOT)}
          >
            To home
          </Button>
          <Button variant="outlined" size="large" type="submit">
            Set password
          </Button>
        </WrapButton>
      </Form>
      {isLoading && <MainLoader />}
    </Wrap>
  );
};

export default ResetPassword;
