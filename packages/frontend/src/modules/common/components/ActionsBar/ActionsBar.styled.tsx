import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const WrapButton = styled.div`
  display: flex;
  gap: ${(props) => props.theme.SPACES[4]};
`;
