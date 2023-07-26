import styled from 'styled-components';
import { IconButton, Box } from '@mui/material';

export const WrapPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${(props) => props.theme.SPACES[4]};
  overflow: hidden;
  height: 100%;
  padding-bottom: ${(props) => props.theme.SPACES[4]};
  padding-top: ${(props) => props.theme.SPACES[4]};
`;

export const WrapFilterSearch = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  gap: ${(props) => props.theme.SPACES[3]};
  flex-wrap: wrap;
  @media screen and (min-width: ${(props) => props.theme.BREAKPOINT.tablet}) {
    flex-direction: row;
  }
`;

export const WrapTodos = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export const WrapPagination = styled.div`
  display: none;

  @media screen and (min-width: ${(props) => props.theme.BREAKPOINT.desktop}) {
    display: block;
  }
`;

export const ButtonAddTodo = styled(IconButton)`
  position: absolute;
  top: ${(props) => props.theme.SPACES[8]};
  left: ${(props) => props.theme.SPACES[3]};
  width: ${(props) => props.theme.SPACES[6]};
  height: ${(props) => props.theme.SPACES[6]};
`;

export const BoxModal = styled(Box)`
  && {
    width: 100%;
    height: 100%;
    background-color: white;
  }
`;
