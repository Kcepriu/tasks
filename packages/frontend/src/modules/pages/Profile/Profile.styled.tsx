import styled from 'styled-components';

export const Wrap = styled.div`
  outline: 1px solid red;
  display: flex;
  gap: 40px;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
`;

export const WrapButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
`;

export const WrapTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: start;
`;
