import styled from 'styled-components';

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;

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
