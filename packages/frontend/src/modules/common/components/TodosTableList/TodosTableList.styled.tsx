import styled from 'styled-components';
import { Typography, TextField } from '@mui/material';

export const Wrap = styled.div`
  height: 100%;
  & .slider {
    height: 100%;
    width: 100%;
  }

  & .slick-dots {
    display: none;
  }

  & .slick-track {
    display: flex;
    height: 100%;
    width: 100%;
  }

  & .slick-list {
    overflow: hidden;
    height: 100%;
    width: 100%;
  }

  & .slick-arrow {
    display: none;
  }
`;

export const Card = styled.div`
  padding: ${(props) => props.theme.SPACES[4]};
  padding-top: ${(props) => props.theme.SPACES[13]};
  height: 100%;
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

export const WrapDescription = styled.div`
  margin-top: ${(props) => props.theme.SPACES[8]};
  width: 100%;
  padding-left: ${(props) => props.theme.SPACES[6]};
  padding-right: ${(props) => props.theme.SPACES[6]};
`;

export const Description = styled(TextField)`
  && {
    width: 100%;
    border: none;
    margin-bottom: ${(props) => props.theme.SPACES[9]};
  }
`;
