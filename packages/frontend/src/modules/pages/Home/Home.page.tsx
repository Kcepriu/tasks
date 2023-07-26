import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { APP_KEYS } from '../../common/consts';
import { Wrap } from './Home.styled';

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <Wrap>
      <Button variant="outlined" size="large" onClick={() => navigate(APP_KEYS.ROUTER_KEYS.LOGIN)}>
        Login
      </Button>

      <Button
        variant="outlined"
        size="large"
        onClick={() => navigate(APP_KEYS.ROUTER_KEYS.REGISTRATION)}
      >
        Register
      </Button>

      <Button
        variant="text"
        size="small"
        onClick={() => navigate(APP_KEYS.ROUTER_KEYS.FORGET_PASSWORD)}
      >
        Forget password
      </Button>
    </Wrap>
  );
};

export default Home;
