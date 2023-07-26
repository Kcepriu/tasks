import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const WrapPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Title = styled.h1`
  margin-top: 10%;
  font-size: 144px;
`;

export const Content = styled.h2`
  margin-top: 24px;
  font-size: 56px;
`;

export const Img = styled.img``;

export const LinkBack = styled(NavLink)`
  margin-top: 30px;
  display: block;

  padding: 20px 40px;
  border: 1px solid gray;
  border-radius: 20px;

  color: black;
  font-style: normal;
  font-weight: 500;
  font-size: 38px;
  text-decoration: none;
`;
