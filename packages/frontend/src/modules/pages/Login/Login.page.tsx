import React, { FC } from 'react';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APP_KEYS } from '../../common/consts';
import { Wrap, Form, WrapButton } from './Login.styled';
import { IRequestUser } from '../../common/types/user.types';
import useLogin from '../../hooks/useLogin';
import MainLoader from '../../common/components/MainLoader/MainLoader.component';
import { validationSchema } from './Login.schema';

const Login: FC = () => {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useLogin();

  const handleSubmit = async (values: IRequestUser) => {
    login(values);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: handleSubmit
  });

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
        <WrapButton>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate(APP_KEYS.ROUTER_KEYS.ROOT)}
          >
            To home
          </Button>
          <Button variant="outlined" size="large" type="submit">
            Login
          </Button>
        </WrapButton>
      </Form>
      {isLoading && <MainLoader />}
    </Wrap>
  );
};

export default Login;
