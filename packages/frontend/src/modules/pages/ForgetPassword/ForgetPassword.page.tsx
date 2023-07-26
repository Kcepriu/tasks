import React, { FC } from 'react';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import { APP_KEYS } from '../../common/consts';
import { Wrap, Form, WrapButton } from './ForgetPassword.styled';
import useSendResetPassword from '../../hooks/useSendResetPassword';
import { IRequestUser } from '../../common/types/user.types';
import { validationSchema } from './ForgetPassword.schema';

const ForgetPassword: FC = () => {
  const navigate = useNavigate();
  const { mutate: register, isSuccess } = useSendResetPassword();

  const handleSubmit = async (values: IRequestUser) => {
    register(values);
  };

  const formik = useFormik({
    initialValues: {
      email: ''
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

        <WrapButton>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate(APP_KEYS.ROUTER_KEYS.ROOT)}
          >
            To home
          </Button>
          <Button variant="outlined" size="large" type="submit">
            Reset password
          </Button>
        </WrapButton>
      </Form>
    </Wrap>
  );
};

export default ForgetPassword;
