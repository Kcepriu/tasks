import styled from 'styled-components';

import { Typography, Button, TextField } from '@mui/material';

export const WraperPage = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-top: ${(props) => props.theme.SPACES[13]};
  padding-left: 0;
  padding-right: 0;

  height: 100vh;
  width: 100%;

  overflow: hidden;

  @media screen and (min-width: ${(props) => props.theme.BREAKPOINT.mobile}) {
    max-width: calc(100vw - ${(props) => props.theme.SPACES_PAGE.mobile});
  }

  @media screen and (min-width: ${(props) => props.theme.BREAKPOINT.tablet}) {
    max-width: calc(100vw - ${(props) => props.theme.SPACES_PAGE.tablet});
  }

  @media screen and (min-width: ${(props) => props.theme.BREAKPOINT.desktop}) {
    max-width: calc(100vw - ${(props) => props.theme.SPACES_PAGE.desktop});
  }
`;

export const Title = styled(TextField)`
  && {
    width: 100%;
    border: none;
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
