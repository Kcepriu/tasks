import React, { FC } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from '@mui/material';
import { Wrap, Form, WrapButton, WrapTitle } from './Profile.styled';
import useChangePassword from '../../hooks/useChangePassword';
import useAuth from '../../hooks/useAuth';
import { IRequestChangePassword } from '../../common/types/user.types';
import MainLoader from '../../common/components/MainLoader/MainLoader.component';
import { APP_KEYS } from '../../common/consts';
import { validationSchema } from './Profile.schema';

const Profile: FC = () => {
  const { mutate: changePassword, isLoading, isSuccess } = useChangePassword();
  const { data: user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? APP_KEYS.ROUTER_KEYS.TODO;

  const handleSubmit = async (values: IRequestChangePassword) => {
    const email = user?.email || '';
    changePassword({ ...values, email });
  };

  const handleBack = () => {
    navigate(backLinkHref);
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      password: ''
    },
    validationSchema,
    onSubmit: handleSubmit
  });
  if (isSuccess) return <Navigate to={backLinkHref} />;

  return (
    <Wrap>
      <WrapTitle>
        <Typography variant="h5">Email: </Typography>
        <Typography variant="h6">{user?.email}</Typography>
      </WrapTitle>
      <Form onSubmit={formik.handleSubmit}>
        <TextField
          id="oldPassword"
          name="oldPassword"
          label="Old password"
          type="password"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
          helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          required
        />

        <TextField
          id="password"
          name="password"
          label="New Password"
          value={formik.values.password}
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
        />
        <WrapButton>
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
          <Button variant="outlined" type="submit">
            Change password
          </Button>
        </WrapButton>
      </Form>
      {isLoading && <MainLoader />}
    </Wrap>
  );
};

export default Profile;
