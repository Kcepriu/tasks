import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.SPACES[4]};
  gap: ${(props) => props.theme.SPACES[4]};
  list-style-type: none;
  overflow-y: auto;
`;

export const Title = styled.h2`
  margin-bottom: ${(props) => props.theme.SPACES[3]};
`;

export const Description = styled.p`
  margin-bottom: ${(props) => props.theme.SPACES[5]};
`;

export const WrapCard = styled.div`
  border: 1px solid ${(props) => props.theme.COLORS.primary};
  padding: ${(props) => props.theme.SPACES[2]};
  border-radius: ${(props) => props.theme.SPACES[3]};
`;
