import React, { FC } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APP_KEYS } from '../../consts';
import { Wrap, WrapButton } from './NavigationTodo.styled';
import useLogout from '../../../hooks/useLogout';

const NavigationTodo: FC = () => {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();

  const handleClick = () => {
    navigate(APP_KEYS.ROUTER_KEYS.PROFILE);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Wrap>
      <WrapButton>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="outlined" onClick={handleClick}>
          Profile
        </Button>
      </WrapButton>
    </Wrap>
  );
};

export default NavigationTodo;
