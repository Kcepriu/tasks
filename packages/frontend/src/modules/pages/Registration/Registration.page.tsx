import React, { FC } from 'react';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import { APP_KEYS } from '../../common/consts';
import { Wrap, Form, WrapButton } from './Registration.styled';
import useRegister from '../../hooks/useRegister';
import MainLoader from '../../common/components/MainLoader/MainLoader.component';
import type { IRequestUser } from '../../common/types/user.types';
import { validationSchema } from './Registration.schema';

const Registration: FC = () => {
  const navigate = useNavigate();
  const { mutate: register, isLoading, isSuccess } = useRegister();

  const handleSubmit = async (values: IRequestUser) => {
    const { confirmPassword, ...user } = values;
    register(user);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
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
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
        />
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
            Registration
          </Button>
        </WrapButton>
      </Form>
      {isLoading && <MainLoader />}
    </Wrap>
  );
};

export default Registration;
