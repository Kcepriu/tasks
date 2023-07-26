import React, { FC } from 'react';
import { Title, WrapPage, Content, LinkBack } from './NotFound.styled';
// import travolta from '../../../assets/image/confused-john-travolta.gif';

const NotFound: FC = () => (
  <WrapPage>
    <Title>404</Title>
    <Content>Not Found page</Content>
    {/* <Img src={travolta} alt="Not found Travolta" /> */}
    <LinkBack to="/" replace>
      {' '}
      Go home
    </LinkBack>
  </WrapPage>
);

export default NotFound;
