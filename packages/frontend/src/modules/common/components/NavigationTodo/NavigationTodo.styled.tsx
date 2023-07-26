import styled from 'styled-components';

export const Wrap = styled.div`
  padding: ${(props) => props.theme.SPACES[2]};
  display: flex;
  justify-content: end;
  text-align: end;
`;

export const WrapButton = styled.div`
  display: flex;
  gap: ${(props) => props.theme.SPACES[2]};
`;
