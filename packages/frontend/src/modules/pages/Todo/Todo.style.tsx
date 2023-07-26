import styled from 'styled-components';

import { Typography, Button, TextField, Box } from '@mui/material';

export const WraperPage = styled.div`
  padding-top: ${(props) => props.theme.SPACES[13]};
`;

export const Title = styled(Typography)`
  && {
    /* margin-top: 150px; */
  }
`;

export const Caption = styled(Typography)`
  && {
    margin-top: ${(props) => props.theme.SPACES[8]};
  }
`;

export const CaptionCheckbox = styled(Typography)`
  && {
    margin-left: ${(props) => props.theme.SPACES[6]};
  }
`;

export const ButtonBack = styled(Button)`
  && {
    margin-top: ${(props) => props.theme.SPACES[8]};
    width: 150px;
  }
`;

export const WrapDescription = styled.div`
  margin-top: ${(props) => props.theme.SPACES[6]};
  width: 100%;
  padding-left: ${(props) => props.theme.SPACES[6]};
  padding-right: ${(props) => props.theme.SPACES[6]};
`;

export const Description = styled(TextField)`
  && {
    width: 100%;
    border: none;
  }
`;

export const WrapStatus = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.theme.SPACES[6]};
  align-items: center;
  margin-top: ${(props) => props.theme.SPACES[8]};
  width: 100%;

  @media screen and (min-width: ${(props) => props.theme.BREAKPOINT.tablet}) {
    width: 70%;
  }
`;

export const BoxModal = styled(Box)`
  && {
    width: 100%;
    height: 100%;
    background-color: white;
  }
`;
